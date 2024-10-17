package com.example.ruleengine.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.ruleengine.ast.Node;

@Entity
@Table(name = "rules")
public class Rule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="rule_string", nullable = false, unique = true, columnDefinition = "TEXT")
    private String ruleString;

    @Column(name="ast", nullable = false, columnDefinition = "TEXT")
    private String ast;

    // Constructors
    public Rule() {}

    public Rule(String ruleString, Node ast) {
        this.ruleString = ruleString;
        this.ast = serializeAST(ast);
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getRuleString() {
        return ruleString;
    }

    public void setRuleString(String ruleString) {
        this.ruleString = ruleString;
    }

    public String getAst() {
        return ast;
    }

    public void setAst(String ast) {
        this.ast = ast;
    }

    /**
     * Serializes the AST Node to a JSON string.
     * 
     * @param ast The AST Node.
     * @return The JSON string representation.
     */
    private String serializeAST(Node ast) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(ast);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize AST", e);
        }
    }

    /**
     * Deserializes the AST JSON string to a Node.
     * 
     * @return The AST Node.
     */
    public Node getAstNode() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(this.ast, Node.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to deserialize AST", e);
        }
    }

    @Override
    public String toString() {
        return "Rule{" +
                "id=" + id +
                ", ruleString='" + ruleString + '\'' +
                ", ast='" + ast + '\'' +
                '}';
    }
}
