export const mockLoadOptions = (inputValue: string): Promise<string[]> => {
  return new Promise((resolve) => {
    const options = [
      'Apple',
      'Banana',
      'Cherry',
      'Durian',
      'Elderberry',
      'Fig',
      'Grape',
      'Honeydew',
      'Kiwi',
      'Lemon',
      'Mango',
      'Nectarine',
      'Orange',
      'Peach',
      'Quince',
      'Raspberry',
      'Strawberry',
      'Tangerine',
      'Ugli fruit',
      'Watermelon',
    ];

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );

    setTimeout(() => {
      resolve(filteredOptions);
    }, 1000); // simulate asynchronous loading
  });
};
