import React, { useState, useEffect } from 'react'
import { useMoralis } from "react-moralis";
import { useMoralisQuery } from "react-moralis";
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
const AddEdit = () => {

  const { Moralis, user, setUserdata } = useMoralis();
  const { data } = useMoralisQuery("ContactDetail")
  const [loading, setLoading] = useState(false);
  const Contact = Moralis.Object.extend("ContactDetail");
  const contact = new Contact();
  const { id } = useParams()
  useEffect(() => {
    data.map((obj) => {
      const Editdata = async () => {
        const query = new Moralis.Query(contact);
        query.equalTo('objectId', obj.id)

        const object = await query.first();
        console.log(query);
        if (id) {
          formik.setValues({
            name: object && object.attributes.name,
            email: object && object.attributes.email,
            password: object && object.attributes.password,
          })
        }
        else {
          const formik = useFormik({
            initialValues: {
              name: "",
              email: "",
              password: "",
            },
            onSubmit: async (values, { resetForm }) => {
              const Contacts = {
                name: values.name,
                email: values.email,
                password: values.password,

              };
              console.log(Contacts, "Contacts");
              try {
                setLoading(true);
                // contact.set("from", user.attributes.username);
                contact.set("name", Contacts.name);
                contact.set("email", Contacts.email);
                contact.set("password", Contacts.password);
                await contact.save();
                setLoading(false);
              } catch (error) {
                setLoading(false);
                // console.log(error);
                alert(error);
              }
              resetForm();
            },
          });
        }
      }
      if(id){
        const ContactDetail = Moralis.Object.extend("ContactDetail");
        const query = new Moralis.Query(ContactDetail);
        console.log(query);
        query.equalTo("objectId", id);
        const object = query.first();
        object.set("name", contact.name);
        object.set("email", contact.email);
        object.set("password", contact.password);
        object.save();
      }
      else {
        contact.set("name", contact.name);
        contact.set("email", contact.email);
        contact.set("password", contact.password);
        contact.save();
      }
    })  
    Editdata();
    }
  )
  return (
    <div>AddEdit</div>
  )

}
export default AddEdit