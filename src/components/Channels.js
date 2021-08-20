import React, { useState, useEffect } from "react";
import "../App.css";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Toast } from "react-bootstrap";

export default function Channels() {
  const [ChannelList, setChannels] = useState([]);
  const [expandedList, setExpandedList] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFailToast, setShowFailToast] = useState(false);
  const toggleShowFailToast = () => setShowFailToast(!showFailToast);
  const toggleShowSuccessToast = () => setShowSuccessToast(!showSuccessToast);

  const getToken = JSON.parse(sessionStorage.getItem("token"));

  async function addChannelToFavorite(channel) {
    const savedChannel = {
      user: getToken.email,
      channelid: channel.id,
      channelname: channel.name,
    };
    return fetch("http://localhost:3001/api/favchannel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(savedChannel),
    })
      .then((data) => data.json())

      .then((data) => {
        if (data.error) {
          setShowFailToast(true);
        } else {
          setShowSuccessToast(true);
        }
      });
  }

  const columns = [
    {
      dataField: "Channels",
      text: "Här kan du se alla kanaler. Klicka på en kanal för att se alla program",
      formatter: (rowContent, row) => {
        return (
          <div className="favprog">
            <h3>{row.name}</h3>
            <Button
              variant="primary"
              onClick={() => fetchChannelsprogram(row.id)}
            >
              Visa kanal
            </Button>
            <Button
              disabled={!sessionStorage.getItem("token")}
              variant="primary"
              onClick={() => addChannelToFavorite(row)}
            >
              Add favorit
            </Button>
          </div>
        );
      },
    },
  ];

  const expandRow = {
    renderer: (row) => (
      <div>
        {expandedList.map((program) => (
          <ul className="borderBottom">
            <li>
              <strong>Program:</strong> {program.name}
            </li>{" "}
            <li>
              <strong>Information:</strong> {program.description}
            </li>{" "}
            <Button
              variant="primary"
              onClick={() => showEpisodeModal(program.id)}
            >
              Visa alla avsnitt
            </Button>
          </ul>
        ))}
      </div>
    ),
    onlyOneExpanding: true,
  };

  function showEpisodeModal(programid) {
    fetch(`/api/v1/channels/episodes/${programid}`)
      .then((res) => res.json())
      .then((res) => {
        setEpisodes(res.episodes);
      })
      .catch((err) => console.log(err));

    handleShow();
  }

  useEffect(() => {
    fetch(`/api/v1/channels`)
      .then((res) => res.json())
      .then((res) => {
        setChannels(res.channels);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchChannelsprogram = (id) => {
    fetch(`/api/v1/channels/program/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setExpandedList(res.programs);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Toast
        show={showFailToast}
        onClose={toggleShowFailToast}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>Failed to add to Favorite</Toast.Body>
      </Toast>
      <Toast
        show={showSuccessToast}
        onClose={toggleShowSuccessToast}
        bg="danger"
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>ADDED to favorit</Toast.Body>
      </Toast>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alla avsnitt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {episodes.map((episode) => (
            <p className="favprog">{episode.title}</p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <BootstrapTable
        keyField="id"
        data={ChannelList}
        columns={columns}
        expandRow={expandRow}
      />
    </div>
  );
}
