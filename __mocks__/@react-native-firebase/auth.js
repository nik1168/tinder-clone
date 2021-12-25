module.exports = () => ({
  onAuthStateChanged: jest.fn(() => Promise.resolve()),
  signInWithCredential: jest.fn(() => Promise.resolve()),
});
