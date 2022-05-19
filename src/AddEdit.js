import React, { useState, useEffect } from 'react'
import { useMoralis,useMoralisQuery } from "react-moralis";
  import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
const AddEdit = () => { 

  const { Moralis } = useMoralis();
  const { data,fetch } = useMoralisQuery("ContactDetail")
  const [loading, setLoading] = useState(false);
  const Contact = Moralis.Object.extend("ContactDetail");
  const contact = new Contact();
  const { id } = useParams()
  useEffect(() => {
   
    const Editdata = async () => {
      const ContactDetail = Moralis.Object.extend("ContactDetail");
      const query = new Moralis.Query(ContactDetail);
      query.equalTo('objectId', id);

      const object = await query.first();
      console.log(object);
      if (id) {
        formik.setValues({
          name: object && object.attributes.name,
          email: object && object.attributes.email,
          password: object && object.attributes.password,
        });
      }
      else {
        formik.setValues({
          name: '',
          email: '',
          password: ''
        })
      }
    }
    
    Editdata()
    
  },[])
  const formik = useFormik({

    initialValues: {
      name: "",
      email: "",
      password: "",

    },
    onSubmit: async (values, { resetForm }) => {
      const formData = {
        name: values.name,
        email: values.email,
        password: values.password

      };
      console.log(formData, "formData");
      try {
        setLoading(true);

        if (id) {
          const ContactDetail = Moralis.Object.extend("ContactDetail");
          const query = new Moralis.Query(ContactDetail);
          console.log(query);
          query.equalTo("objectId", id);
          const object = await query.first();
          object.set("name", formData.name);
          object.set("email", formData.email);
          object.set("password", formData.password);
          object.save();
        }
        else {
          contact.set("name", formData.name);
          contact.set("email", formData.email);
          contact.set("password", formData.password);
          
          contact.save();
        }

        setLoading(false);

      } 
      catch (error) {
        setLoading(false);
        alert(error);

      }
      resetForm();
    },
  });
  // const { data, error, isLoading } = useMoralisQuery("ContactDetail");
  // if (error) {
  //   return <span>🤯</span>;
  // }
  // if (isLoading) {
  //   return <span>🙄</span>;
  // }
  // console.log(data);
  return (
    <div>
      <div>
        <h6>
          Contact Detail</h6>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            justifyContent: "center",
            marginLeft: "12vw",
            marginRight: "12vw",
          }} >
          <textarea
            required
            aria-label="minimum height"
            placeholder="Enter Your Name"
            style={{ marginTop: "20px", }}
            {...formik.getFieldProps("name")}
          ></textarea>
          <br />

          <textarea
            required
            aria-label="minimum height"
            placeholder="Enter Your Email"
            style={{ marginTop: "20px", }}
            {...formik.getFieldProps("email")}
          ></textarea>
          <br />

          <textarea
            required
            aria-label="minimum height"
            placeholder="Enter Your Password"
            style={{ marginTop: "20px" }}
            {...formik.getFieldProps("password")}
          ></textarea>
          <br />
          <button type="submit">Submit</button>
          <br />
        </form>
      </div>
    </div>
  )
}
export default AddEdit;