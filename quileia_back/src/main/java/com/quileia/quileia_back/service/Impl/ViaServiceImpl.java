package com.quileia.quileia_back.service.Impl;

import com.quileia.quileia_back.commons.GenericServiceImpl;
import com.quileia.quileia_back.dao.api.ViaDaoAPI;
import com.quileia.quileia_back.model.Via;
import com.quileia.quileia_back.service.api.ViaServiceAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public class ViaServiceImpl  extends GenericServiceImpl<Via, Integer> implements ViaServiceAPI {

    @Autowired
    private ViaDaoAPI viaDaoAPI;

    @Override
    public CrudRepository<Via, Integer> getDao() {return viaDaoAPI;}
}
