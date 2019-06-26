module.exports = {
  selectedItem: {
    element: ".document-list-item-container.selected",
    dateCreated:
      '.document-list-item-container.selected > :nth-child(2) > .col > [data-testid=collapse] > [data-testid=attributes_list] > [data-testid="Date Created"]',
    fileSize:
      '.document-list-item-container.selected > :nth-child(2) > .col > [data-testid=collapse] > [data-testid=attributes_list] > [data-testid="File Size"]',
    initials:
      ".document-list-item-container.selected > :nth-child(2) > .col > [data-testid=collapse] > [data-testid=attributes_list] > [data-testid=Initials]"
  }
};
