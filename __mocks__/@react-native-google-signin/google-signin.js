module.exports = () => ({
  GoogleSignin: {
    configure: jest.fn(),
    signIn: jest.fn().mockReturnValue({idToken: ''}),
  },
});
