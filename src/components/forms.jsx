import React from "react";
import { useState } from "react";
import "../assets/global.css";
import { SubmitBtn } from "./buttons";

export function PredictionForm() {
    return (
        <form action="" className="makePredictionForm">
            <div className="formOptionCont p1Cont">
                <label for="p1">P1</label>
                <div className="formSelectCont">
                    <select name="p1-entry" id="p1" className="dropdownElement">
                        <option value="">???</option>
                        <option value="Albon" className="albon">
                            Alex ALBON
                        </option>
                        <option value="Alonso">Fernando ALONSO</option>
                        <option value="Bottas">Valterri BOTTAS</option>
                        <option value="Gasly">Pierre GASLY</option>
                        <option value="Hamilton">Lewis HAMILTON</option>
                        <option value="Hulkenberg">Niko HULKENBERG</option>
                        <option value="Leclerc">Charles LECLERC</option>
                        <option value="Magnussen">Kevin MAGNUSSEN</option>
                        <option value="Norris">Lando NORRIS</option>
                        <option value="Ocon">Esteban OCON</option>
                        <option value="Perez">Sergio PEREZ</option>
                        <option value="Piastri">Oscar PIASTRI</option>
                        <option value="Ricciardo">Daniel RICCIARDO</option>
                        <option value="Russell">George RUSSELL</option>
                        <option value="Sainz">Carlos SAINZ</option>
                        <option value="Sargeant">Logan SARGEANT</option>
                        <option value="Stroll">Lance STROLL</option>
                        <option value="Tsunoda">Yuki TSUNODA</option>
                        <option value="Verstappen">Max VERSTAPPEN</option>
                        <option value="Zhou">Guanyo ZHOU</option>
                    </select>
                </div>
            </div>
            <div className="formOptionCont p2Cont">
                <label for="p2">P2</label>
                <div className="formSelectCont">
                    <div className="colorBox"></div>
                    <select name="p2-entry" id="p2" className="dropdownElement">
                        <option value="">???</option>
                        <option value="Albon">ALB</option>
                        <option value="Alonso">ALO</option>
                        <option value="Bottas">BOT</option>
                        <option value="Gasly">GAS</option>
                        <option value="Hamilton">HAM</option>
                        <option value="Hulkenberg">HUL</option>
                        <option value="Leclerc">LEC</option>
                        <option value="Magnussen">MAG</option>
                        <option value="Norris">NOR</option>
                        <option value="Ocon">OCO</option>
                        <option value="Perez">PER</option>
                        <option value="Piastri">PIA</option>
                        <option value="Ricciardo">RIC</option>
                        <option value="Russell">RUS</option>
                        <option value="Sainz">SAI</option>
                        <option value="Sargeant">SAR</option>
                        <option value="Stroll">STR</option>
                        <option value="Tsunoda">TSU</option>
                        <option value="Verstappen">VER</option>
                        <option value="Zhou">ZHO</option>
                    </select>
                </div>
            </div>
            <div className="formOptionCont p3Cont">
                <label for="p3">P3</label>
                <div className="formSelectCont">
                    <div className="colorBox"></div>
                    <select name="p3-entry" id="p3" className="dropdownElement">
                        <option value="">???</option>
                        <option value="Albon">ALB</option>
                        <option value="Alonso">ALO</option>
                        <option value="Bottas">BOT</option>
                        <option value="Gasly">GAS</option>
                        <option value="Hamilton">HAM</option>
                        <option value="Hulkenberg">HUL</option>
                        <option value="Leclerc">LEC</option>
                        <option value="Magnussen">MAG</option>
                        <option value="Norris">NOR</option>
                        <option value="Ocon">OCO</option>
                        <option value="Perez">PER</option>
                        <option value="Piastri">PIA</option>
                        <option value="Ricciardo">RIC</option>
                        <option value="Russell">RUS</option>
                        <option value="Sainz">SAI</option>
                        <option value="Sargeant">SAR</option>
                        <option value="Stroll">STR</option>
                        <option value="Tsunoda">TSU</option>
                        <option value="Verstappen">VER</option>
                        <option value="Zhou">ZHO</option>
                    </select>
                </div>
            </div>
            <div className="formOptionCont p4Cont">
                <label for="p4">P4</label>
                <div className="formSelectCont">
                    <div className="colorBox"></div>
                    <select name="p4-entry" id="p4" className="dropdownElement">
                        <option value="">???</option>
                        <option value="Albon">ALB</option>
                        <option value="Alonso">ALO</option>
                        <option value="Bottas">BOT</option>
                        <option value="Gasly">GAS</option>
                        <option value="Hamilton">HAM</option>
                        <option value="Hulkenberg">HUL</option>
                        <option value="Leclerc">LEC</option>
                        <option value="Magnussen">MAG</option>
                        <option value="Norris">NOR</option>
                        <option value="Ocon">OCO</option>
                        <option value="Perez">PER</option>
                        <option value="Piastri">PIA</option>
                        <option value="Ricciardo">RIC</option>
                        <option value="Russell">RUS</option>
                        <option value="Sainz">SAI</option>
                        <option value="Sargeant">SAR</option>
                        <option value="Stroll">STR</option>
                        <option value="Tsunoda">TSU</option>
                        <option value="Verstappen">VER</option>
                        <option value="Zhou">ZHO</option>
                    </select>
                </div>
            </div>
            <div className="formOptionCont p5Cont">
                <label for="p5">P5</label>
                <div className="formSelectCont">
                    <div className="colorBox"></div>
                    <select name="p5-entry" id="p5" className="dropdownElement">
                        <option value="">???</option>
                        <option value="Albon">ALB</option>
                        <option value="Alonso">ALO</option>
                        <option value="Bottas">BOT</option>
                        <option value="Gasly">GAS</option>
                        <option value="Hamilton">HAM</option>
                        <option value="Hulkenberg">HUL</option>
                        <option value="Leclerc">LEC</option>
                        <option value="Magnussen">MAG</option>
                        <option value="Norris">NOR</option>
                        <option value="Ocon">OCO</option>
                        <option value="Perez">PER</option>
                        <option value="Piastri">PIA</option>
                        <option value="Ricciardo">RIC</option>
                        <option value="Russell">RUS</option>
                        <option value="Sainz">SAI</option>
                        <option value="Sargeant">SAR</option>
                        <option value="Stroll">STR</option>
                        <option value="Tsunoda">TSU</option>
                        <option value="Verstappen">VER</option>
                        <option value="Zhou">ZHO</option>
                    </select>
                </div>
            </div>
            <div className="formOptionCont p6Cont">
                <label for="p6">P6</label>
                <div className="formSelectCont">
                    <div className="colorBox"></div>
                    <select name="p6-entry" id="p6" className="dropdownElement">
                        <option value="">???</option>
                        <option value="Albon">ALB</option>
                        <option value="Alonso">ALO</option>
                        <option value="Bottas">BOT</option>
                        <option value="Gasly">GAS</option>
                        <option value="Hamilton">HAM</option>
                        <option value="Hulkenberg">HUL</option>
                        <option value="Leclerc">LEC</option>
                        <option value="Magnussen">MAG</option>
                        <option value="Norris">NOR</option>
                        <option value="Ocon">OCO</option>
                        <option value="Perez">PER</option>
                        <option value="Piastri">PIA</option>
                        <option value="Ricciardo">RIC</option>
                        <option value="Russell">RUS</option>
                        <option value="Sainz">SAI</option>
                        <option value="Sargeant">SAR</option>
                        <option value="Stroll">STR</option>
                        <option value="Tsunoda">TSU</option>
                        <option value="Verstappen">VER</option>
                        <option value="Zhou">ZHO</option>
                    </select>
                </div>
            </div>
            <div className="formOptionCont p7Cont">
                <label for="p7">P7</label>
                <div className="formSelectCont">
                    <div className="colorBox"></div>
                    <select name="p7-entry" id="p7" className="dropdownElement">
                        <option value="">???</option>
                        <option value="Albon">ALB</option>
                        <option value="Alonso">ALO</option>
                        <option value="Bottas">BOT</option>
                        <option value="Gasly">GAS</option>
                        <option value="Hamilton">HAM</option>
                        <option value="Hulkenberg">HUL</option>
                        <option value="Leclerc">LEC</option>
                        <option value="Magnussen">MAG</option>
                        <option value="Norris">NOR</option>
                        <option value="Ocon">OCO</option>
                        <option value="Perez">PER</option>
                        <option value="Piastri">PIA</option>
                        <option value="Ricciardo">RIC</option>
                        <option value="Russell">RUS</option>
                        <option value="Sainz">SAI</option>
                        <option value="Sargeant">SAR</option>
                        <option value="Stroll">STR</option>
                        <option value="Tsunoda">TSU</option>
                        <option value="Verstappen">VER</option>
                        <option value="Zhou">ZHO</option>
                    </select>
                </div>
            </div>
            <div className="formOptionCont p8Cont">
                <label for="p8">P8</label>
                <div className="formSelectCont">
                    <div className="colorBox"></div>
                    <select name="p8-entry" id="p8" className="dropdownElement">
                        <option value="">???</option>
                        <option value="Albon">ALB</option>
                        <option value="Alonso">ALO</option>
                        <option value="Bottas">BOT</option>
                        <option value="Gasly">GAS</option>
                        <option value="Hamilton">HAM</option>
                        <option value="Hulkenberg">HUL</option>
                        <option value="Leclerc">LEC</option>
                        <option value="Magnussen">MAG</option>
                        <option value="Norris">NOR</option>
                        <option value="Ocon">OCO</option>
                        <option value="Perez">PER</option>
                        <option value="Piastri">PIA</option>
                        <option value="Ricciardo">RIC</option>
                        <option value="Russell">RUS</option>
                        <option value="Sainz">SAI</option>
                        <option value="Sargeant">SAR</option>
                        <option value="Stroll">STR</option>
                        <option value="Tsunoda">TSU</option>
                        <option value="Verstappen">VER</option>
                        <option value="Zhou">ZHO</option>
                    </select>
                </div>
            </div>
            <div className="formOptionCont p9Cont">
                <label for="p9">P9</label>
                <div className="formSelectCont">
                    <div className="colorBox"></div>
                    <select name="p9-entry" id="p9" className="dropdownElement">
                        <option value="">???</option>
                        <option value="Albon">ALB</option>
                        <option value="Alonso">ALO</option>
                        <option value="Bottas">BOT</option>
                        <option value="Gasly">GAS</option>
                        <option value="Hamilton">HAM</option>
                        <option value="Hulkenberg">HUL</option>
                        <option value="Leclerc">LEC</option>
                        <option value="Magnussen">MAG</option>
                        <option value="Norris">NOR</option>
                        <option value="Ocon">OCO</option>
                        <option value="Perez">PER</option>
                        <option value="Piastri">PIA</option>
                        <option value="Ricciardo">RIC</option>
                        <option value="Russell">RUS</option>
                        <option value="Sainz">SAI</option>
                        <option value="Sargeant">SAR</option>
                        <option value="Stroll">STR</option>
                        <option value="Tsunoda">TSU</option>
                        <option value="Verstappen">VER</option>
                        <option value="Zhou">ZHO</option>
                    </select>
                </div>
            </div>
            <div className="formOptionCont p10Cont">
                <label for="p10">P10</label>
                <div className="formSelectCont">
                    <div className="colorBox"></div>
                    <select name="p10-entry" id="p10" className="dropdownElement">
                        <option value="">???</option>
                        <option value="Albon">ALB</option>
                        <option value="Alonso">ALO</option>
                        <option value="Bottas">BOT</option>
                        <option value="Gasly">GAS</option>
                        <option value="Hamilton">HAM</option>
                        <option value="Hulkenberg">HUL</option>
                        <option value="Leclerc">LEC</option>
                        <option value="Magnussen">MAG</option>
                        <option value="Norris">NOR</option>
                        <option value="Ocon">OCO</option>
                        <option value="Perez">PER</option>
                        <option value="Piastri">PIA</option>
                        <option value="Ricciardo">RIC</option>
                        <option value="Russell">RUS</option>
                        <option value="Sainz">SAI</option>
                        <option value="Sargeant">SAR</option>
                        <option value="Stroll">STR</option>
                        <option value="Tsunoda">TSU</option>
                        <option value="Verstappen">VER</option>
                        <option value="Zhou">ZHO</option>
                    </select>
                </div>
            </div>
            <SubmitBtn 
                type={"submit"}
                />
        </form>
    )
}