let mockScan;

function setup(functionName, mock) {
  switch (functionName) {
    case "scan":
      mockScan = mock;
      break;

    default:
      throw new Error(`Invalid function name ${functionName}`);
  }
}

const scan = async () => await mockScan();

export { setup, scan };
