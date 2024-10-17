package com.example.ruleengine.controller;

import com.example.ruleengine.ast.ASTService;
import com.example.ruleengine.ast.Node;
import com.example.ruleengine.entity.Rule;
import com.example.ruleengine.service.RuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/rules")
public class RuleController {

    @Autowired
    private ASTService astService;

    @Autowired
    private RuleService ruleService;

    /**
     * Endpoint to create a new rule.
     * 
     * @param ruleString The rule string in the request body.
     * @return The created Rule object.
     */
    @PostMapping("/create")
    public ResponseEntity<Rule> createRule(@RequestBody String ruleString) {
        try {
            Node ast = astService.createRule(ruleString);
            Rule rule = ruleService.saveRule(ruleString, ast);
            return ResponseEntity.ok(rule);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    /**
     * Endpoint to combine multiple rules into a single AST.
     * 
     * @param ruleIds The list of rule IDs to combine.
     * @return The combined AST Node.
     */
    @PostMapping("/combine")
    public ResponseEntity<Node> combineRules(@RequestBody List<Long> ruleIds) {
        try {
            List<Node> rules = ruleService.getRulesByIds(ruleIds);
            Node combinedAst = astService.combineRules(rules);
            return ResponseEntity.ok(combinedAst);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    /**
     * Endpoint to evaluate a combined rule against provided data.
     * 
     * @param request The evaluation request containing the AST and data.
     * @return The evaluation result (true/false).
     */
    @PostMapping("/evaluate")
    public ResponseEntity<Boolean> evaluateRule(@RequestBody EvaluationRequest request) {
        try {
            Node root = request.getRule();
            Map<String, Object> data = request.getData();
            boolean result = astService.evaluateRule(root, data);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(false);
        }
    }

    /**
     * DTO for evaluation requests.
     */
    public static class EvaluationRequest {
        private Node rule;
        private Map<String, Object> data;

        public Node getRule() {
            return rule;
        }

        public void setRule(Node rule) {
            this.rule = rule;
        }

        public Map<String, Object> getData() {
            return data;
        }

        public void setData(Map<String, Object> data) {
            this.data = data;
        }
    }
}
