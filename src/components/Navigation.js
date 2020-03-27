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
                <button>HOME</button>
            </NavLink>
        </PizzaNav>
    )
}

export default Navigation;