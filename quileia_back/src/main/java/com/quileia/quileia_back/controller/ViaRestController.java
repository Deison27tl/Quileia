package com.quileia.quileia_back.controller;
import com.quileia.quileia_back.model.AgenteDeTransito;
import com.quileia.quileia_back.model.Via;
import com.quileia.quileia_back.service.api.ViaServiceAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v2/")
@CrossOrigin(origins = "http://localhost:3000")
public class ViaRestController {

    @Autowired
    private ViaServiceAPI viaServiceAPI;

    @GetMapping(value = "/all")
    public List<Via> getAll(){
        return viaServiceAPI.getAll();
    }


    @GetMapping(value = "/find/{id}")
    public Via find(@PathVariable Integer id){
        return viaServiceAPI.get(id);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Via> save(@RequestBody Via via){
        Via obj = viaServiceAPI.save(via);
        return new ResponseEntity<Via>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<Via> delete(@PathVariable Integer id){
        Via via = viaServiceAPI.get(id);
        if(via != null){
            viaServiceAPI.delete(id);
        } else {
            return new ResponseEntity<Via>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<Via>(via, HttpStatus.OK);
    }
}
