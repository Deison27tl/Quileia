package com.quileia.quileia_back.model;
import javax.persistence.*;
import java.util.List;

@Entity
public class Via {

    @Id
    private int id;
    @Column
    private String tipó_via;
    @Column
    private String cll_cr;
    @Column
    private int numero;
    @Column
    private double nivel_congestion;

    @OneToMany(mappedBy = "via")
    private List<AgenteDeTransito> agenteDeTransito;

    public Via() {
    }

    public Via(int id, String tipó_via, String cll_cr, int numero, double nivel_congestion) {
        this.id = id;
        this.tipó_via = tipó_via;
        this.cll_cr = cll_cr;
        this.numero = numero;
        this.nivel_congestion = nivel_congestion;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTipó_via() {
        return tipó_via;
    }

    public void setTipó_via(String tipó_via) {
        this.tipó_via = tipó_via;
    }

    public String getCll_cr() {
        return cll_cr;
    }

    public void setCll_cr(String cll_cr) {
        this.cll_cr = cll_cr;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public double getNivel_congestion() {
        return nivel_congestion;
    }

    public void setNivel_congestion(double nivel_congestion) {
        this.nivel_congestion = nivel_congestion;
    }

    @Override
    public String toString() {
        return "Via{" +
                "id=" + id +
                ", tipó_via='" + tipó_via + '\'' +
                ", cll_cr='" + cll_cr + '\'' +
                ", numero=" + numero +
                ", nivel_congestion=" + nivel_congestion +
                '}';
    }
}
