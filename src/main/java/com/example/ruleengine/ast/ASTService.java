package com.example.ruleengine.ast;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.StringTokenizer;

@Service
public class ASTService {

    /**
     * Parses a rule string and creates the corresponding AST.
     * 
     * @param ruleString The rule string to parse.
     * @return The root node of the AST.
     * @throws IllegalArgumentException if the rule string is invalid.
     */
    public Node createRule(String ruleString) {
        try {
            StringTokenizer tokenizer = new StringTokenizer(ruleString, " ()", true);
            Stack<Node> operators = new Stack<>();
            Stack<Node> operands = new Stack<>();

            while (tokenizer.hasMoreTokens()) {
                String token = tokenizer.nextToken().trim();
                if (token.isEmpty()) {
                    continue;
                }

                if (token.equals("(")) {
                    operators.push(new Node("operator", "("));
                } else if (token.equals(")")) {
                    while (!operators.isEmpty() && !operators.peek().getValue().equals("(")) {
                        Node operator = operators.pop();
                        Node right = operands.pop();
                        Node left = operands.pop();
                        operands.push(new Node("operator", operator.getValue(), left, right));
                    }
                    if (!operators.isEmpty() && operators.peek().getValue().equals("(")) {
                        operators.pop(); // Remove "("
                    }
                } else if (token.equalsIgnoreCase("AND") || token.equalsIgnoreCase("OR")) {
                    while (!operators.isEmpty() && precedence(operators.peek().getValue()) >= precedence(token)) {
                        Node operator = operators.pop();
                        Node right = operands.pop();
                        Node left = operands.pop();
                        operands.push(new Node("operator", operator.getValue(), left, right));
                    }
                    operators.push(new Node("operator", token.toUpperCase()));
                } else {
                    // Operand (condition)
                    operands.push(new Node("operand", token));
                }
            }

            while (!operators.isEmpty()) {
                Node operator = operators.pop();
                Node right = operands.pop();
                Node left = operands.pop();
                operands.push(new Node("operator", operator.getValue(), left, right));
            }

            if (operands.isEmpty()) {
                throw new IllegalArgumentException("Invalid rule string.");
            }

            return operands.pop();
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to parse rule string: " + e.getMessage(), e);
        }
    }

    /**
     * Combines multiple ASTs into a single AST using AND as the default operator.
     * 
     * @param rules The list of AST root nodes to combine.
     * @return The root node of the combined AST.
     */
    public Node combineRules(List<Node> rules) {
        if (rules == null || rules.isEmpty()) {
            throw new IllegalArgumentException("No rules to combine.");
        }

        Node combined = rules.get(0);
        for (int i = 1; i < rules.size(); i++) {
            combined = new Node("operator", "AND", combined, rules.get(i));
        }
        return combined;
    }

    /**
     * Evaluates the AST against the provided attributes.
     * 
     * @param root The root node of the AST.
     * @param attributes The map of attributes to evaluate against.
     * @return True if the attributes satisfy the AST rules, False otherwise.
     */
    public boolean evaluateRule(Node root, Map<String, Object> attributes) {
        if (root == null) {
            return false;
        }

        switch (root.getType()) {
            case "operand":
                return evaluateCondition(root.getValue(), attributes);
            case "operator":
                boolean leftResult = evaluateRule(root.getLeft(), attributes);
                boolean rightResult = evaluateRule(root.getRight(), attributes);
                if ("AND".equalsIgnoreCase(root.getValue())) {
                    return leftResult && rightResult;
                } else if ("OR".equalsIgnoreCase(root.getValue())) {
                    return leftResult || rightResult;
                } else {
                    throw new IllegalArgumentException("Unknown operator: " + root.getValue());
                }
            default:
                throw new IllegalArgumentException("Unknown node type: " + root.getType());
        }
    }

    /**
     * Evaluates a single condition against the attributes.
     * 
     * @param condition The condition string (e.g., "age > 30").
     * @param attributes The map of attributes.
     * @return True if the condition is satisfied, False otherwise.
     */
    private boolean evaluateCondition(String condition, Map<String, Object> attributes) {
        // Simple condition parser: <attribute> <operator> <value>
        String[] parts = condition.split("\\s+");
        if (parts.length < 3) {
            throw new IllegalArgumentException("Invalid condition: " + condition);
        }

        String attribute = parts[0];
        String operator = parts[1];
        String valueStr = condition.substring(condition.indexOf(operator) + operator.length()).trim();

        Object attributeValue = attributes.get(attribute);
        if (attributeValue == null) {
            return false;
        }

        try {
            switch (operator) {
                case ">":
                    return compare(attributeValue, valueStr) > 0;
                case ">=":
                    return compare(attributeValue, valueStr) >= 0;
                case "<":
                    return compare(attributeValue, valueStr) < 0;
                case "<=":
                    return compare(attributeValue, valueStr) <= 0;
                case "==":
                case "=":
                    return attributeValue.toString().equalsIgnoreCase(stripQuotes(valueStr));
                case "!=":
                    return !attributeValue.toString().equalsIgnoreCase(stripQuotes(valueStr));
                default:
                    throw new IllegalArgumentException("Unsupported operator: " + operator);
            }
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid number format in condition: " + condition, e);
        }
    }

    /**
     * Compares the attribute value with the condition value.
     * Assumes both are numeric.
     * 
     * @param attributeValue The attribute value from the data.
     * @param valueStr The value from the condition.
     * @return 1 if attributeValue > valueStr, 0 if equal, -1 if less.
     */
    private int compare(Object attributeValue, String valueStr) {
        double attributeNum = Double.parseDouble(attributeValue.toString());
        double conditionNum = Double.parseDouble(valueStr);
        return Double.compare(attributeNum, conditionNum);
    }

    /**
     * Strips quotes from a string if present.
     * 
     * @param value The input string.
     * @return The string without surrounding quotes.
     */
    private String stripQuotes(String value) {
        if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith("\"") && value.endsWith("\""))) {
            return value.substring(1, value.length() - 1);
        }
        return value;
    }

    /**
     * Determines the precedence of operators.
     * Higher number means higher precedence.
     * 
     * @param operator The operator string.
     * @return The precedence value.
     */
    private int precedence(String operator) {
        switch (operator.toUpperCase()) {
            case "AND":
                return 2;
            case "OR":
                return 1;
            case "(":
                return 0;
            default:
                return 0;
        }
    }
}
