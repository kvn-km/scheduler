import React from "react";
import axios from "axios";

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
  queryByText,
  queryByAltText
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

  it("MINE: loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { getByText, container, debug } = render(<Application />);
    await waitForElement(() => getByText("Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    expect(getByPlaceholderText(appointment, "Enter Student Name")).toBeInTheDocument();
    expect(getByAltText(appointment, "Sylvia Palmer")).toBeInTheDocument();
    const input = getByPlaceholderText(appointment, "Enter Student Name");
    fireEvent.change(input, { target: { value: "Kevin Kim" } });
    const interviewer = getByAltText(appointment, "Sylvia Palmer");
    fireEvent.click(interviewer, { target: { alt: "Sylvia Palmer" } });
    expect(interviewer).toHaveClass("interviewers__item--selected");
    act(() => {
      fireEvent.click(getByText("Save"));
    });
    expect(getByText("Saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText("Saving"));
    expect(getByText("Kevin Kim")).toBeInTheDocument();
    const day = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"));
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

  it("MINE: loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug, getByAltText } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "showAppointment")[0];
    fireEvent.click(getByAltText("Delete"));
    const confirmation = getAllByTestId(container, "confirmation")[0];
    fireEvent.click(getByText(confirmation, "Confirm"));
    expect(getByText(container, "Deleting")).toBeInTheDocument();
    const schedule = getAllByTestId(container, "appointment")[0];
    await waitForElement(() => queryByAltText(schedule, "Add"));
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("COMPASS: load data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(queryByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Kevin Kim" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    const schedule = getAllByTestId(container, "appointment")[1];
    await waitForElement(() => getByText(schedule, "Kevin Kim"));
    const day = getAllByTestId(container, "day")
      .find(day => queryByText(day, "Monday"));
    expect(day).toHaveTextContent("1 spot remaining");
  });

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

  });








});