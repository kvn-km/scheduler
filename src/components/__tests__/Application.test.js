import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  screen,
  getByDisplayValue
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

  xit("BLOCKED -- CONTINUING BELOW", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    console.log(prettyDOM(container));
    // cannot get back this point as the required element is not found
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { getByText, container } = render(<Application />);
    await waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Monday"));
        expect(getByText("Archie Cohen")).toBeInTheDocument();
        // const appointments = getAllByTestId(container, "appointment");
        // const appointment = appointments[0]; // this was my solution, worked
        //
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
        fireEvent.click(getByText("Save"));
        // test we are in SAVING mode
        expect(getByText("Kevin Kim")).toBeInTheDocument();
        console.log(prettyDOM(container));
      });
  });
});

