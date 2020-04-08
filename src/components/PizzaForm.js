import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";

const FormDiv = styled.div `
    display: flex;
    justify-content: center;
`;

const formSchema = yup.object().shape({
    name: yup.string().min(2).required("Must have a name of at least 2 characters"),
    size: yup.string(),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    chicken: yup.boolean(),
    mushrooms: yup.boolean(),
    special: yup.string()
})

const PizzaForm = () => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [formState, setFormState] = useState({
        name: "",
        size: "Small",
        pepperoni: "",
        sausage: "",
        chicken: "",
        mushrooms: "",
        special: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni: "",
        sausage: "",
        chicken: "",
        mushrooms: "",
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
                name: "",
                size: "Small",
                pepperoni: "",
                sausage: "",
                chicken: "",
                mushrooms: "",
                special: ""
            });
          })
          .catch(err => console.log(err.response));
    };

    return (
        <FormDiv>
            <form onSubmit={formSubmit}>
                <label htmlFor="name">Name
                    <input 
                        name="name"
                        id="name"
                        type="text"
                        value={formState.name}
                        onChange={inputChange}
                        pattern="[A-Za-z]{2,}"
                    />
                    {errors.name.length > 0 ? <p id="nameP">{errors.name}</p> : null}
                </label>

                <br />

                <label htmlFor="size">Size
                    <select id="size" name="size" onChange={inputChange}>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Extra Large">Extra Large</option>
                    </select>
                </label>

                <br />

                <h3>Toppings</h3>

                <label htmlFor="pepperoni">Pepperoni
                    <input 
                        name="pepperoni"
                        id="pepperoni"
                        type="checkbox"
                        checked={formState.pepperoni}
                        onChange={inputChange}
                    />
                    {errors.pepperoni.length > 0 ? <p id="pepperoniP">{errors.pepperoni}</p> : null}
                </label>

                <label htmlFor="sausage">Sausage
                    <input 
                        name="sausage"
                        id="sausage"
                        type="checkbox"
                        checked={formState.sausage}
                        onChange={inputChange}
                    />
                    {errors.sausage.length > 0 ? <p id="sausageP">{errors.sausage}</p> : null}
                </label>

                <label htmlFor="chicken">Chicken
                    <input 
                        name="chicken"
                        id="chicken"
                        type="checkbox"
                        checked={formState.chicken}
                        onChange={inputChange}
                    />
                    {errors.chicken.length > 0 ? <p id="chickenP">{errors.chicken}</p> : null}
                </label>

                <label htmlFor="mushrooms">Mushrooms
                    <input 
                        name="mushrooms"
                        id="mushrooms"
                        type="checkbox"
                        checked={formState.mushrooms}
                        onChange={inputChange}
                    />
                    {errors.mushrooms.length > 0 ? <p id="mushroomsP">{errors.mushrooms}</p> : null}
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

export default PizzaForm;