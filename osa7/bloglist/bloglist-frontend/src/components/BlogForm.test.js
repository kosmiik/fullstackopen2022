import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> calling callbackfunction with right information when blog created", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const title = screen.getByTestId("title");
  const author = screen.getByTestId("author");
  const url = screen.getByTestId("url");
  const createButton = screen.getByText("create");

  await user.type(title, "Lorem ipsum dolor sit amet");
  await user.type(author, "Miika Koskela");
  await user.type(url, "http://lorem.ipsum");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Lorem ipsum dolor sit amet");
  expect(createBlog.mock.calls[0][0].author).toBe("Miika Koskela");
  expect(createBlog.mock.calls[0][0].url).toBe("http://lorem.ipsum");
});
