import React, { useState, useEffect } from 'react';
import { Form } from 'formik';
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import {Context} from './Context/context'

export const CreateSleepEntry = (props) => {

  const toAxios = (id) => {
    axiosWithAuth()
      .get(`/sleep/id/${id}`)
      .then(res => {
        const sd = res.data;
        setSleepdate(sd.sleepdate);
        setWakedate(sd.wakedate);
        setSleepmood(sd.sleepmood);
        setWakemood(sd.wakemood);
        setAvgmood(sd.daymood);
      })
      .catch(err => console.log('Oops', err.respond))
  }

  useEffect(() => {
    const url = props.match.url;  //  "/CreateSleepEntry"
    const id = props.location.pathname.replace(`${url}/`, "")
    if (id !== "") {
      return toAxios(id);
    }
  }, []);

  
  const { addSleepEntry } = useState("");
  const [sleepdate, setSleepdate] = useState("");
  const [wakedate, setWakedate] = useState("");
  const [sleepmood, setSleepmood] = useState("");
  const [wakemood, setWakemood] = useState("");
  const [avgmood, setAvgmood] = useState("");

  const handleSleepdateChange = e => {
    setSleepdate(e.target.value);
  };

  const handleWakedateChange = e => {
    setWakedate(e.target.value);
  };
  const handleSleepmoodChange = e => {
    setSleepmood(e.target.value);
  };
  const handleWakemoodChange = e => {
    setWakemood(e.target.value);
  };
  const handleAvgmoodChange = e => {
    setAvgmood(e.target.value);
  };

  const submitSleepEntry = e => {
    e.preventDefault();
    addSleepEntry(e, sleepdate, wakedate, sleepmood, wakemood, avgmood);
    setSleepdate("");
    setWakedate("");
    setSleepmood("");
    setWakemood("");
    setAvgmood("");
  };

  return (
    <>
      <div>
        <Form onSubmit={submitSleepEntry}>
          <h2>Add Sleep Entry</h2>
          <input
            onChange={handleSleepdateChange}
            placeholder="Bedtime"
            value={sleepdate}
            name="SleepDate"
          />
          <input
            onChange={handleWakedateChange}
            placeholder="Waketime"
            value={wakedate}
            name="Wake Date"
          />
          <input
            onChange={handleSleepmoodChange}
            placeholder="Sleep Mood"
            value={sleepmood}
            name="Sleep Mood"
          />
          <input
            onChange={handleWakemoodChange}
            placeholder="Wake Mood"
            value={wakemood}
            name="Wake Mood"
          />
          <input
            onChange={handleAvgmoodChange}
            placeholder="Overall Mood"
            value={avgmood}
            name="Average Mood"
          />
          <button>Add Entry</button>
        </Form>
      </div>
      <div>
        {" "}
        {/* <SleepEntryList /> */}
      </div>
    </>
  );
};

export default CreateSleepEntry;
