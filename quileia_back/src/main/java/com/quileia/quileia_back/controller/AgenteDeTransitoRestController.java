package com.quileia.quileia_back.controller;

import com.quileia.quileia_back.model.AgenteDeTransito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.quileia.quileia_back.service.api.AgenteDeTransitoServiceAPI;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/")
@CrossOrigin("http://localhost:3000")
public class AgenteDeTransitoRestController {

    @Autowired
    private AgenteDeTransitoServiceAPI agenteDeTransitoServiceAPI;

    @GetMapping(value = "all")
    public List<AgenteDeTransito> getAll(){
        return agenteDeTransitoServiceAPI.getAll();
    }

    @GetMapping(value = "/find/{codigo}")
    public AgenteDeTransito find(@PathVariable Integer codigo){
        return agenteDeTransitoServiceAPI.get(codigo);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<AgenteDeTransito> save(@RequestBody AgenteDeTransito agenteDeTransito){
        AgenteDeTransito obj = agenteDeTransitoServiceAPI.save(agenteDeTransito);
        return  new ResponseEntity<AgenteDeTransito>(obj, HttpStatus.OK);
    }

    @GetMapping(value = "/delete/{codigo}")
    public ResponseEntity<AgenteDeTransito> delete(@PathVariable Integer codigo){
        AgenteDeTransito agenteDeTransito = agenteDeTransitoServiceAPI.get(codigo);
        if(agenteDeTransito != null){
            agenteDeTransitoServiceAPI.delete(codigo);
        } else {
            return new ResponseEntity<AgenteDeTransito>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<AgenteDeTransito>(agenteDeTransito, HttpStatus.OK);
    }

}
