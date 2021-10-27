package com.quileia.quileia_back.model;
import javax.persistence.*;

@Entity
public class AgenteDeTransito {
    @Id
    private int codigo;
    @Column
    private String name;
    @Column
    private double years_experiencia;
    @Column
    private String cod_secretaria;

    @ManyToOne
    @JoinColumn(name = "via_actual")
    private Via via;

    public AgenteDeTransito() {
    }

    public AgenteDeTransito(int codigo, String name, double years_experiencia, String cod_secretaria, Via via) {
        this.codigo = codigo;
        this.name = name;
        this.years_experiencia = years_experiencia;
        this.cod_secretaria = cod_secretaria;
        this.via = via;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getYears_experiencia() {
        return years_experiencia;
    }

    public void setYears_experiencia(double years_experiencia) {
        this.years_experiencia = years_experiencia;
    }

    public String getCod_secretaria() {
        return cod_secretaria;
    }

    public void setCod_secretaria(String cod_secretaria) {
        this.cod_secretaria = cod_secretaria;
    }

    public Via getVia() {
        return via;
    }

    public void setVia(Via via) {
        this.via = via;
    }

    @Override
    public String toString() {
        return "AgenteDeTransito{" +
                "codigo=" + codigo +
                ", name='" + name + '\'' +
                ", years_experiencia=" + years_experiencia +
                ", cod_secretaria='" + cod_secretaria + '\'' +
                ", via=" + via +
                '}';
    }
}

