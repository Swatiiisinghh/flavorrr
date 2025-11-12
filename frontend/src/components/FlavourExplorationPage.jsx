import CountryCultureSelector from './CountryCultureSelector';
import DietHealthPreferences from './DietHealthPreferences';
import FlavorPairingMatrix from './FlavourPairingMatrix';
import MoodWheel from './MoodWheel'

function FlavorExplorationPage() {
  return (
    <main>
      <CountryCultureSelector />
      <DietHealthPreferences />
      {/* <FlavorPairingMatrix /> */}
      <MoodWheel/>
    </main>
  );
}

export default FlavorExplorationPage;
