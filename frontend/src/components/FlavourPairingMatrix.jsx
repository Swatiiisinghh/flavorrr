
import './FlavourPairingMatrix.css';

function FlavorPairingMatrix() {
  const flavors = ['Sweet', 'Sour', 'Salty', 'Bitter', 'Umami'];
  const pairings = [
    [1, 0.5, 0.8, 0.2, 0.9],
    [0.5, 1, 0.6, 0.3, 0.7],
    [0.8, 0.6, 1, 0.4, 0.85],
    [0.2, 0.3, 0.4, 1, 0.5],
    [0.9, 0.7, 0.85, 0.5, 1],
  ];

  return (
    <section className="flavor-pairing-matrix">
      <table>
        <thead>
          <tr>
            <th></th>
            {flavors.map((flavor, index) => (
              <th key={index}>{flavor}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flavors.map((flavorRow, rowIndex) => (
            <tr key={rowIndex}>
              <td>{flavorRow}</td>
              {flavors.map((flavorCol, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    backgroundColor: `rgba(252, 182, 159, ${pairings[rowIndex][colIndex]})`,
                  }}
                  className="flavor-pairing-matrix__cell"
                  title={`Pairing score between ${flavorRow} and ${flavorCol}`}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default FlavorPairingMatrix;
