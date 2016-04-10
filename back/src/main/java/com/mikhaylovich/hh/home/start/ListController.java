package com.mikhaylovich.hh.home.start;

import com.mikhaylovich.hh.home.model.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mhty on 03.04.16.
 */

@RestController
public class ListController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ListController.class);

    List<Element> elements = getList();

    @RequestMapping(value = "/save", consumes = "application/json")
    public ResponseEntity save(@RequestBody List<Element> elements) {
        System.out.println(elements.size());

//        LOGGER.info(new String(bytes, StandardCharsets.UTF_8));
//        ObjectMapper mapper = new ObjectMapper();
//        try {
//            this.elements = mapper.readValue(bytes,  mapper.getTypeFactory().constructCollectionType(List.class, Element.class));
//            LOGGER.info("saved count {}", this.elements.size());
//        } catch (IOException e) {
//            LOGGER.error("cannot read text: {}", bytes);
//            throw new RuntimeException("Cannot read text: " + bytes);
//        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/load", method = RequestMethod.GET, produces = "application/json")
    public List<Element> load() {
        return this.elements;
    }

    public List<Element> getList() {
        List<Element> list = new ArrayList<>(3);
        list.add(new Element("1", "first"));
        list.add(new Element("2", "second"));
        list.add(new Element("3", "third"));
        return list;
    }
}
