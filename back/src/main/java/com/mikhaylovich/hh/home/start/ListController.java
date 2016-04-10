package com.mikhaylovich.hh.home.start;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by mhty on 03.04.16.
 */

@Controller
public class ListController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ListController.class);

    @RequestMapping(value = "/save", method = RequestMethod.PUT)
    public void save(@RequestParam(value="list", required=true) String list) {
        LOGGER.info("list");
    }


}
