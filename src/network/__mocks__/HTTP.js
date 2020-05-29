export const mockPost = jest.fn();

export default jest.fn().mockImplementation((options = {}) => {
  if (options.postErr) {
    mockPost.mockRejectedValue(Error(options.postErr));
  } else {
    mockPost.mockResolvedValue(options.postRet);
  }

  return {
    post: mockPost,
  };
});
