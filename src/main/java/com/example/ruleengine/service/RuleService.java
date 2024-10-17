package com.example.ruleengine.service;

import com.example.ruleengine.ast.Node;
import com.example.ruleengine.entity.Rule;
import com.example.ruleengine.repository.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RuleService {

    @Autowired
    private RuleRepository ruleRepository;

    /**
     * Saves a new rule to the database.
     * 
     * @param ruleString The rule string.
     * @param ast The AST Node.
     * @return The saved Rule entity.
     */
    public Rule saveRule(String ruleString, Node ast) {
        Rule rule = new Rule(ruleString, ast);
        return ruleRepository.save(rule);
    }

    /**
     * Retrieves rules by their IDs.
     * 
     * @param ruleIds The list of rule IDs.
     * @return The list of AST Nodes corresponding to the rules.
     * @throws IllegalArgumentException if any rule ID is not found.
     */
    public List<Node> getRulesByIds(List<Long> ruleIds) {
        List<Rule> rules = ruleRepository.findAllById(ruleIds);
        if (rules.size() != ruleIds.size()) {
            throw new IllegalArgumentException("One or more rule IDs not found.");
        }
        return rules.stream()
                    .map(Rule::getAstNode)
                    .collect(Collectors.toList());
    }

    /**
     * Retrieves all rules from the database.
     * 
     * @return The list of all Rule entities.
     */
    public List<Rule> getAllRules() {
        return ruleRepository.findAll();
    }
}
