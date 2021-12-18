const mockNavigation = jest.requireActual('@react-navigation/native');

module.exports = {
  ...mockNavigation,
  useIsFocused: jest.fn().mockReturnValue(true),
};
