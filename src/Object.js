import React, { useState,useEffect } from "react";
import { useMoralis,useMoralisQuery } from "react-moralis";
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Object = () => {
  const { Moralis} = useMoralis();
  const [Pagerefesh, setPageRefresh] = useState(false);

  const { data, fetch } = useMoralisQuery("ContactDetail");

    useEffect(() => {
      fetch()
    }, [Pagerefesh])

  let removeData;
  data.map((obj) => {

    removeData = async (id) => {

      const query = new Moralis.Query('ContactDetail')
      query.equalTo('objectId', id)
      const object = await query.first(({ useMasterKey: true }))
      // console.log(JSON.stringify(object))
      if (object) {
        object.destroy().then(() => {
          alert("Deleted data!");
          setPageRefresh(!Pagerefesh)
        }, (error) => {
          console.log(error);
        })
      } 
    }
  })
  return (
    <>
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
    </>
  );
};
export default Object;
