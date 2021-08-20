import "./Login.css";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Modal from "react-bootstrap/Modal";

export default function FavoriteProgram() {
  const [programFavList, setFavProgram] = useState([]);
  const [channelFavList, setFavChannel] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [startTime, setStartTime] = useState([]);

  const history = useHistory(); //A react hook. Gives you acces to the history object.

  function showEpisodModal(episode) {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    fetchChannelEpisodes(episode, date);
    handleShow();
  }
  const fetchChannelEpisodes = (id, date) => {
    fetch(`/api/v1/channels/schedule/${id}/${date}`)
      .then((res) => res.json())
      .then((res) => {
        setEpisodes(res);
      })
      .catch((err) => console.log(err));
  };

  async function deleteProgram(program) {
    return fetch(`http://localhost:3001/api/favprog/${program.programid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        fetch("http://localhost:3001/api/favprog")
          .then((res) => res.json())
          .then((res) => {
            setFavProgram(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  async function fetchFavChannel(useremail) {
    fetch(`http://localhost:3001/api/favchannel/${useremail}`)
      .then((res) => res.json())
      .then((res) => {
        setFavChannel(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function deleteChannel(channel) {
    return fetch(`http://localhost:3001/api/favchannel/${channel.channelid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        const useremail = JSON.parse(sessionStorage.getItem("token")).email;
        fetchFavChannel(useremail);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const useremail = JSON.parse(sessionStorage.getItem("token")).email;
      fetchFavChannel(useremail);
    } else {
      history.replace("/");
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/favprog")
      .then((res) => res.json())
      .then((res) => {
        setFavProgram(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function showTime(starttimeutc) {
    const getDateValue = Number(starttimeutc.slice(6, 19));
    const broadCastTime = new Date(getDateValue);

    const formatedDate =
      broadCastTime.toLocaleDateString() +
      " Kl " +
      broadCastTime.toLocaleTimeString();

    return formatedDate;
  }

  return (
    <div className="login-wrapper">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dagens Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {episodes.map((program) => (
            <div className="favprog">
              <p>{program.title}</p>
              <p>{showTime(program.starttimeutc)}</p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Tabs id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="FavoritProgram" title="Favorit Program">
          <ListGroup as="ul">
            <ListGroup.Item as="li" variant="primary">
              Min favorit program lista
            </ListGroup.Item>

            {programFavList.map((program) => (
              <ListGroup.Item as="li">
                <div className="deletebtn">
                  {program.programname}
                  <Button onClick={() => deleteProgram(program)}>delete</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
        <Tab eventKey="FavoritChannels" title="FavoritChannels">
          <ListGroup as="ul">
            <ListGroup.Item as="li" variant="primary">
              Mina favorit kanaler
            </ListGroup.Item>

            {channelFavList.map((channel) => (
              <ListGroup.Item as="li">
                <div className="deletebtn">
                  <p>{channel.channelname}</p>
                  <Button onClick={() => deleteChannel(channel)}>delete</Button>
                  <Button
                    variant="primary"
                    onClick={() => showEpisodModal(channel.channelid)}
                  >
                    Dagens Tablå
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
    </div>
  );
}
