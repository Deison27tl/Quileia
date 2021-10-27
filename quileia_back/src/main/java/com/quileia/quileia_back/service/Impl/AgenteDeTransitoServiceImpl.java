package com.quileia.quileia_back.service.Impl;

import com.quileia.quileia_back.commons.GenericServiceImpl;
import com.quileia.quileia_back.dao.api.AgenteDeTransitoDaoAPI;
import com.quileia.quileia_back.model.AgenteDeTransito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import com.quileia.quileia_back.service.api.AgenteDeTransitoServiceAPI;

@Service
public class AgenteDeTransitoServiceImpl  extends GenericServiceImpl<AgenteDeTransito, Integer> implements AgenteDeTransitoServiceAPI{
    @Autowired
    private AgenteDeTransitoDaoAPI agenteDeTransitoDaoAPI;


    @Override
    public CrudRepository<AgenteDeTransito, Integer> getDao() {
        return agenteDeTransitoDaoAPI;
    }
}
