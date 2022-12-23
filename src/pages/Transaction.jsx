import React from "react";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import NavAdmin from "../components/NavAdmin";
import { API } from "../config/api";
import Rupiah from "rupiah-format";
import emptyTransaction from "../assets/noTransaction.png"

export default function Transaction() {
  const title = "Transactions";
  document.title = "Waysbeans | " + title;

  let { data: transactions, refetch } = useQuery(
    "transactionsCache",
    async () => {
      const response = await API.get("/transactions");
      return response.data.data;
    }
  );

  return (
    <div>
      <NavAdmin />
      {transactions?.length === 0 ? (
        <>
          <Container className="mt-5 pt-5 d-flex justify-content-center">
            <img className="w-50" src={emptyTransaction} alt="Empty Transaction"/>
          </Container>
          <Container className="d-flex justify-content-center">
            <p className="fw-bold fs-2 brownColor">There is no transaction in here...</p>
          </Container>
        </>
      ) : (
        <Container className="mt-5 pt-5">
          <h1 className="text-primer my-3">Income Transaction</h1>
          <Table responsive bordered hover className="text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Address</th>
                <th>ID Order</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((item, index) => (
                <tr key={index}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle">{item.user.name}</td>
                  <td className="align-middle">{item.user.address}</td>
                  <td className="align-middle">{item.id}</td>
                  <td className="align-middle">
                    {Rupiah.convert(item?.total)}
                  </td>
                  <td
                    className={
                      item.status === "success"
                        ? "success"
                        : item.status === "cancel"
                        ? "canceled"
                        : item.status === "pending"
                        ? "waiting"
                        : item.status === "On the way"
                        ? "ontheway"
                        : ""
                    }
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
}
