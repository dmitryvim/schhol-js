package com.mikhaylovich.hh.home.start;

import com.mikhaylovich.hh.home.model.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mhty on 03.04.16.
 */

@Controller
public class ListController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ListController.class);

    List<Element> elements = getList();

    @RequestMapping(value = "/save")
    public ResponseEntity save(@RequestBody List<Element> list) {
        for (Element e : list) {
            LOGGER.info("set list item {}", e.toString());
        }
        this.elements.clear();
        this.elements.addAll(list);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/load", method = RequestMethod.GET, produces = "application/json")
    public List<Element> load() {
        return this.elements;
    }

    public List<Element> getList() {
        List<Element> list = new ArrayList<Element>(3);
        list.add(new Element("1", "first"));
        list.add(new Element("2", "second"));
        list.add(new Element("3", "third"));
        return list;
    }
}
