import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
    const PizzaNav = styled.nav `
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

    return (
        <PizzaNav>
            <h1>Lambda Eats</h1>
            <NavLink to={`/`}>
                <button id="homeButton">HOME</button>
            </NavLink>
            <NavLink to={`/cart`}>
                <button id="homeButton">CART</button>
            </NavLink>
        </PizzaNav>
    )
}

export default Navigation;