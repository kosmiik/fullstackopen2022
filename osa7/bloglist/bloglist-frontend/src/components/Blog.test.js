import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("Blog renders title and author", () => {
  const blog = {
    title: "Lorem ipsum dolor sit amet",
    author: "Miika Koskela",
    url: "lorem ipsum",
    likes: 1,
  };

  const rendering = render(<Blog blog={blog} />);

  expect(rendering.container).toHaveTextContent(`${blog.title}`);
  expect(rendering.container).toHaveTextContent(`${blog.author}`);
  expect(rendering.container).not.toHaveTextContent(`${blog.url}`);
  expect(rendering.container).not.toHaveTextContent(`${blog.likes}`);
});

test("clicking show-button reveals likes and url", async () => {
  const blog = {
    title: "Lorem ipsum dolor sit amet",
    author: "Miika Koskela",
    url: "lorem ipsum",
    likes: 1,
    user: "Miika",
  };

  const rendering = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  expect(rendering.container).toHaveTextContent(`${blog.title}`);
  expect(rendering.container).toHaveTextContent(`${blog.author}`);
  expect(rendering.container).toHaveTextContent(`${blog.url}`);
  expect(rendering.container).toHaveTextContent(`${blog.likes}`);
});

test("clicking the like-button twice calls event handler twice", async () => {
  const blog = {
    title: "Lorem ipsum dolor sit amet",
    author: "Miika Koskela",
    url: "lorem ipsum",
    likes: 1,
    user: "Miika",
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} updateBlog={mockHandler} />);

  const user = userEvent.setup();
  const bShow = screen.getByText("show");
  await user.click(bShow);
  const bLike = screen.getByText("like");
  await user.click(bLike);
  await user.click(bLike);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
