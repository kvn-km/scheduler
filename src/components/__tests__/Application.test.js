import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  waitForElementToBeRemoved,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  act,
  queryByText
} from "@testing-library/react";

import Application from "../Application";

afterEach(cleanup);

describe("APPLICATION", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  // below is my solution
  // below THIS is compass' solution
  it("MINE: loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { getByText, container, debug } = render(<Application />);
    await waitForElement(() => getByText("Archie Cohen"));
    // click ADD
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    // test
    expect(getByPlaceholderText(appointment, "Enter Student Name")).toBeInTheDocument();
    expect(getByAltText(appointment, "Sylvia Palmer")).toBeInTheDocument();
    // input student name
    const input = getByPlaceholderText(appointment, "Enter Student Name");
    fireEvent.change(input, { target: { value: "Kevin Kim" } });
    // select interviewer
    const interviewer = getByAltText(appointment, "Sylvia Palmer");
    fireEvent.click(interviewer, { target: { alt: "Sylvia Palmer" } });
    // test
    expect(interviewer).toHaveClass("interviewers__item--selected");
    // click save
    act(() => {
      fireEvent.click(getByText("Save"));
    });
    // test that we are in SAVING mode
    expect(getByText("Saving")).toBeInTheDocument();
    // wait for the SAVING mode to transition to SHOW mode
    await waitForElementToBeRemoved(() => getByText("Saving"));
    // test that KEVIN KIM Student is now shown in interview spot
    expect(getByText("Kevin Kim")).toBeInTheDocument();
    //
    const day = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"));
    // console.log(prettyDOM(day));
    expect(day).toHaveTextContent("no spots remaining");
  });


  it("COMPASS: loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
});