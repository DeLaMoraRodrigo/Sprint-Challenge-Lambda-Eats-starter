import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";

const FormDiv = styled.div `
    display: flex;
    justify-content: center;
`;

const formSchema = yup.object().shape({
    deliveryPickup: yup.string(),
                fork: yup.boolean(),
                spoon: yup.boolean(),
                knife: yup.boolean(),
                straw: yup.boolean(),
    special: yup.string()
})

const Cart = () => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [formState, setFormState] = useState({
        deliveryPickup: "",
                fork: "",
                spoon: "",
                knife: "",
                straw: "",
                special: ""
    });

    const [errors, setErrors] = useState({
        deliveryPickup: "",
                fork: "",
                spoon: "",
                knife: "",
                straw: "",
                special: ""
    });

    const [post, setPost] = useState([]);

    const validateChange = e => {
        // Reach will allow us to "reach" into the schema and test only one part.
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.type === "checkbox" ? e.target.checked : e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
              console.log(err.errors)
            setErrors({
              ...errors,
              [e.target.name]: err.errors
            });
          });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
          ...formState,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
    
        validateChange(e);
        setFormState(newFormData);
    };

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
          setButtonDisabled(!valid);
        });
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        axios
          .post("https://reqres.in/api/users", formState)
          .then(res => {
            setPost(res.data); // get just the form data from the REST api
            console.log("success", post);
            // reset form if successful
            setFormState({
                deliveryPickup: "",
                fork: "",
                spoon: "",
                knife: "",
                straw: "",
                special: ""
            });
          })
          .catch(err => console.log(err.response));
    };

    return (
        <FormDiv>
            <form onSubmit={formSubmit}>

                <label htmlFor="deliveryPickup">Size
                    <select id="deliveryPickup" name="deliveryPickup" onChange={inputChange}>
                        <option value="Delivery">Delivery</option>
                        <option value="Pickup">Pickup</option>
                    </select>
                </label>

                <br />

                <h3>Toppings</h3>

                <label htmlFor="fork">Fork
                    <input 
                        name="fork"
                        id="fork"
                        type="checkbox"
                        checked={formState.fork}
                        onChange={inputChange}
                    />
                    {errors.fork.length > 0 ? <p id="forkP">{errors.fork}</p> : null}
                </label>

                <label htmlFor="spoon">Sausage
                    <input 
                        name="spoon"
                        id="spoon"
                        type="checkbox"
                        checked={formState.spoon}
                        onChange={inputChange}
                    />
                    {errors.spoon.length > 0 ? <p id="spoonP">{errors.spoon}</p> : null}
                </label>

                <label htmlFor="knife">Chicken
                    <input 
                        name="knife"
                        id="knife"
                        type="checkbox"
                        checked={formState.knife}
                        onChange={inputChange}
                    />
                    {errors.knife.length > 0 ? <p id="knifeP">{errors.knife}</p> : null}
                </label>

                <label htmlFor="straw">Mushrooms
                    <input 
                        name="straw"
                        id="straw"
                        type="checkbox"
                        checked={formState.straw}
                        onChange={inputChange}
                    />
                    {errors.straw.length > 0 ? <p id="strawP">{errors.straw}</p> : null}
                </label>

                <br />

                <label htmlFor="special">Special Instructions
                    <textarea 
                        name="special"
                        id="special"
                        value={formState.special}
                        onChange={inputChange}
                    />
                    {errors.special.length > 0 ? <p id="specialP">{errors.special}</p> : null}
                </label>

                <pre>{JSON.stringify(post, null, 2)}</pre>

                <button type="submit" disabled={buttonDisabled}>Submit</button>
            </form>
        </FormDiv>
    )
}

export default Cart;