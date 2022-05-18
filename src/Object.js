import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { useFormik, Form, FormikProvider } from "formik";
import { useMoralisQuery } from "react-moralis";
import { Link } from 'react-router-dom';

import Table from 'react-bootstrap/Table';

const Object = () => {
  const { Moralis, user } = useMoralis();
  const [loading, setLoading] = useState(false);
// const[obj,setobj]= useState();
    const Contact = Moralis.Object.extend("ContactDetail");
    const contact = new Contact();
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
  const { data, error, isLoading } = useMoralisQuery("ContactDetail");
  if (error) {
    return <span>🤯</span>;
  }
  if (isLoading) {
    return <span>🙄</span>;
  }
  console.log(data);
  let removeData;
  data.map((obj) => {

    removeData = async () => {

      const query = new Moralis.Query('ContactDetail')
      query.equalTo('objectId', obj.id)
      const object = await query.first(({ useMasterKey: true }))
      console.log(JSON.stringify(object))
      if (object) {
        object.destroy().then(() => {
          alert("Deleted data!");
        }, (error) => {
          console.log(error);
        })
      } 
    }
  })
 
 
  return (
    <>
      <div>
        <h6>
          Contact Detail</h6>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            // justifyContent: "center",
            // marginLeft: "12vw",
            // marginRight: "12vw",
          }}
        >
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
        <div className="jumbotron jumbotron-fluid">
          <div className="container"><br />
            <h1 className="text-center">Contact Detail</h1>
          </div><br />
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-5">
              <Table className=" table-border variant='dark' table-stripped">
                <thead className="thead-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((obj, index) => {
                    return (
                      <tr key={obj.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{obj.attributes.name}</td>
                        <td>{obj.attributes.email}</td>
                        <td>{obj.attributes.password}</td>
                        <td>
                          <Link to = {`/update/${obj.id}`}>
                          <button className="btn btn-success" >Edit</button>
                          </Link>
                          <button className="btn btn-danger" onClick={() => { removeData(obj.id) }} >Delete</button>

                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Object;
