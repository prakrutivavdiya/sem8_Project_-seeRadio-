import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import "./videosInProduction.css";
import { Card, Col, Button, Row, Table } from "reactstrap";
import { FaFilter, FaArrowDown, FaArrowUp } from "react-icons/fa";
import PersonDetailModal from "./PersonDetailModal/personDetailModal";
import { Link } from "react-router-dom";
import { privateGet, privatePost } from "../../Network/Requests";
import { Get_All_Campaigns, Get_person_Detail } from "../../Network/Api";
import NavBar from "../../components/NavBar";

const VideosInProduction = () => {

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [personDetail, setPersonDetail] = useState({});
  const [companyDetail, setCompanyDetail] = useState({});

  const openModal = (id) => {
    const headers = {
      'x-token': sessionStorage.getItem('token')
    }
    privateGet(Get_person_Detail + id, headers,
      (res) => {
        console.log(res.data.data)
        setPersonDetail(res.data.data.person);
        setCompanyDetail(res.data.data.companyData);
      },
      (error) => {
        console.log(error);
      }
    )
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const headers = {
      'x-token': sessionStorage.getItem('token')
    }
    privatePost(Get_All_Campaigns, headers, {},
      (res) => {
        console.log(res);
        setData(res.data.data.rows);
        setCount(res.data.data.count);
      },
      (error) => {
        console.log(error);
      }
    )
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "clientCampaignNumber",
      },
      {
        Header: "Title/Details",
        accessor: "title",
        Cell: (col) => {
          return (
            <>
              <Link to={`CampaignDetail/${col.cell.row.original.id}`}>
                <strong>{col.value}</strong>
              </Link>
              <p>{col.cell.row.original.description}</p>
            </>
          );
        },
      },
      {
        Header: "Advertiser",
        accessor: "clientCompany.companyName",
      },
      {
        Header: "Action Required By",
        accessor: "statusWithPerson",
        Cell: (col) => {
          return (
            <>
              <button
                onClick={(id) => openModal(col.value.id)}
                className="btn btn-link"
              >
                {col.value.firstName} {col.value.lastName}
              </button>
              <p style={{ marginLeft: "5%" }}>({col.value.roleCode})</p>
            </>
          );
        },
      },
      {
        Header: "Next Action Due By",
        accessor: "statusDueDate",
        Cell: (col) => {
          return (
            <p>
              <strong>Not Selected</strong>
            </p>
          );
        },
      },
      {
        Header: "Progress",
        accessor: "",
        Cell: (col) => {
          return (
            <p>
              <strong>Not Selected</strong>
            </p>
          );
        },
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: (col) => {
          return (
            <p>
              <strong>Not Selected</strong>
            </p>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage,
    canPreviousPage, setPageSize, prepareRow, state } = useTable(
      { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
      useGlobalFilter,
      useSortBy,
      usePagination
    );

  const { pageIndex } = state;
  return (
    <>
      <PersonDetailModal modalIsOpen={modalIsOpen} closeModal={closeModal} openModal={openModal} person={personDetail} companyData={companyDetail} />
      <NavBar />
      <div style={{ margin: '20px 0' }}>
        <Row>
          <Col md={4}>
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              <FaFilter />
              {' '}Search Filters
              </Button>
            <span style={{ padding: "5px" }}>{count} Results Returns</span>
          </Col>
          <Col md={4}>
            <h4>
              <strong>Videos In Production</strong>
            </h4>
          </Col>
        </Row>
      </div>
      <Card style={{ padding: "20px", width:'90%', margin:'0 auto'}}>
        <div style={{ overflow: "scroll" }}>
          <Table {...getTableProps()} striped borderless>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(
                        column.getSortByToggleProps()
                      )}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaArrowDown />
                          ) : (
                            <FaArrowUp />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Row style={{margin:"10px 0"}}>
          <Col md={6}>
            Results Per Page :
                <Button
              id="btn10"
              className="btnPageSize"

              onClick={() => {
                setPageSize(10);
              }}
            >
              10
                </Button>
            <span> | </span>
            <Button className="btnPageSize" onClick={() => setPageSize(20)}>
              20
                </Button>
            <span> | </span>
            <Button className="btnPageSize" onClick={() => setPageSize(30)}>
              30
                </Button>
          </Col>
          <Col md={6}>
            <span style={{ float: "right" }}>
              <Button
                size="lg"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Prev
                  </Button>
              <span style={{ padding: "7px" }}>
                <Button
                  style={{
                    borderRadius: "80px",
                    backgroundColor: "#0275d8",
                    border: "none",
                    cursor: "none",
                  }}
                  size="lg"
                >
                  <strong>{pageIndex + 1}</strong>
                </Button>
              </span>
              <Button
                size="lg"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
                  </Button>
            </span>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default VideosInProduction;
