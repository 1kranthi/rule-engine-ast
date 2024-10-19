package com.example.ruleengine;

import com.example.ruleengine.ast.ASTService;
import com.example.ruleengine.ast.Node;
import com.example.ruleengine.entity.Rule;
import com.example.ruleengine.repository.RuleRepository;
import com.example.ruleengine.service.RuleService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.*;

import static org.mockito.Mockito.*;

@SpringBootTest
public class RuleEngineAstApplicationTests {

    @Autowired
    private ASTService astService;

    @Autowired
    private RuleService ruleService;

    @MockBean
    private RuleRepository ruleRepository;

    @BeforeEach
    public void setup() {
        // Reset mocks before each test
        reset(ruleRepository);
    }

    @Test
    public void testCreateRule() {
        String ruleString = "age > 30 AND department = 'Sales'";
        Node ast = astService.createRule(ruleString);

        Assertions.assertNotNull(ast);
        Assertions.assertEquals("operator", ast.getType());
        Assertions.assertEquals("AND", ast.getValue());
        Assertions.assertNotNull(ast.getLeft());
        Assertions.assertNotNull(ast.getRight());

        Assertions.assertEquals("operand", ast.getLeft().getType());
        Assertions.assertEquals("age > 30", ast.getLeft().getValue());

        Assertions.assertEquals("operand", ast.getRight().getType());
        Assertions.assertEquals("department = 'Sales'", ast.getRight().getValue());
    }

    @Test
    public void testCombineRules() {
        Node rule1 = astService.createRule("age > 30 AND department = 'Sales'");
        Node rule2 = astService.createRule("salary > 50000");

        List<Node> rules = Arrays.asList(rule1, rule2);
        Node combined = astService.combineRules(rules);

        Assertions.assertNotNull(combined);
        Assertions.assertEquals("operator", combined.getType());
        Assertions.assertEquals("AND", combined.getValue());

        Assertions.assertEquals("operator", combined.getLeft().getType());
        Assertions.assertEquals("AND", combined.getLeft().getValue());

        Assertions.assertEquals("operator", combined.getRight().getType());
        Assertions.assertEquals("AND", combined.getRight().getValue()); // Since combined with AND
    }

    @Test
    public void testEvaluateRuleTrue() {
        String ruleString = "age > 30 AND department = 'Sales'";
        Node ast = astService.createRule(ruleString);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("age", 35);
        attributes.put("department", "Sales");

        boolean result = astService.evaluateRule(ast, attributes);
        Assertions.assertTrue(result);
    }

    @Test
    public void testEvaluateRuleFalse() {
        String ruleString = "age > 30 AND department = 'Sales'";
        Node ast = astService.createRule(ruleString);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("age", 25);
        attributes.put("department", "Marketing");

        boolean result = astService.evaluateRule(ast, attributes);
        Assertions.assertFalse(result);
    }

    @Test
    public void testSaveRule() {
        String ruleString = "age > 30 AND department = 'Sales'";
        Node ast = astService.createRule(ruleString);
        Rule rule = new Rule(ruleString, ast);

        when(ruleRepository.save(any(Rule.class))).thenReturn(rule);

        Rule savedRule = ruleService.saveRule(ruleString, ast);
        Assertions.assertNotNull(savedRule);
        Assertions.assertEquals(ruleString, savedRule.getRuleString());
        Assertions.assertEquals(ast.toString(), savedRule.getAst());

        verify(ruleRepository, times(1)).save(any(Rule.class));
    }

    @Test
    public void testGetRulesByIds() {
        Long id1 = 1L;
        Long id2 = 2L;

        Rule rule1 = new Rule("age > 30 AND department = 'Sales'", astService.createRule("age > 30 AND department = 'Sales'"));
        rule1.setAst(astService.createRule("age > 30 AND department = 'Sales'").toString());
        Rule rule2 = new Rule("salary > 50000", astService.createRule("salary > 50000"));
        rule2.setAst(astService.createRule("salary > 50000").toString());

        when(ruleRepository.findAllById(Arrays.asList(id1, id2))).thenReturn(Arrays.asList(rule1, rule2));

        List<Node> rules = ruleService.getRulesByIds(Arrays.asList(id1, id2));
        Assertions.assertEquals(2, rules.size());

        verify(ruleRepository, times(1)).findAllById(Arrays.asList(id1, id2));
    }

    @Test
    public void testEvaluateCombinedRule() {
        String rule1Str = "age > 30 AND department = 'Sales'";
        String rule2Str = "salary > 50000";

        Node rule1 = astService.createRule(rule1Str);
        Node rule2 = astService.createRule(rule2Str);
        Node combined = astService.combineRules(Arrays.asList(rule1, rule2));

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("age", 35);
        attributes.put("department", "Sales");
        attributes.put("salary", 60000);

        boolean result = astService.evaluateRule(combined, attributes);
        Assertions.assertTrue(result);
    }
}
