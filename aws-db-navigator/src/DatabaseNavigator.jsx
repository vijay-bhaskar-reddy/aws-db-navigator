
import {{ useState }} from 'react';
import {{ Card, CardContent }} from "@/components/ui/card";
import {{ Button }} from "@/components/ui/button";

const dataMap = {{ /* existing structure with pricing included */ }};

export default function DatabaseNavigator() {{
  const [path, setPath] = useState([]);
  const [showPrices, setShowPrices] = useState(true);
  const [priceFilter, setPriceFilter] = useState('All');

  const getCurrentNode = () => path.reduce((node, key) => node[key], dataMap);
  const currentNode = getCurrentNode();

  const extractPrice = (line) => {{
    const match = line.match(/\$(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : null;
  }};

  const filterItems = (items) => {{
    return items.filter((item) => {{
      if (!showPrices && item.includes('$')) return false;
      if (priceFilter === 'All') return true;
      const price = extractPrice(item);
      if (priceFilter === '<0.1') return price !== null && price < 0.1;
      if (priceFilter === '0.1-0.5') return price >= 0.1 && price <= 0.5;
      if (priceFilter === '>0.5') return price > 0.5;
      return true;
    }});
  }};

  return (
    <div className="p-6 space-y-4">
      <div className="text-xl font-bold">AWS Database Navigator</div>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={{() => setShowPrices(!showPrices)}}>
          {{showPrices ? 'Hide Pricing' : 'Show Pricing'}}
        </Button>
        <select
          className="border rounded px-2 py-1"
          value={{priceFilter}}
          onChange={{(e) => setPriceFilter(e.target.value)}}
        >
          <option value="All">All Prices</option>
          <option value="<0.1">Low (< $0.1)</option>
          <option value="0.1-0.5">Mid ($0.1 - $0.5)</option>
          <option value=">0.5">High (> $0.5)</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4">
        {{typeof currentNode === 'object' && !Array.isArray(currentNode) ? (
          Object.keys(currentNode).map(key => (
            <Card key={{key}} className="cursor-pointer hover:shadow-xl" onClick={{() => setPath([...path, key])}}>
              <CardContent className="p-4 font-medium">{{key}}</CardContent>
            </Card>
          ))
        ) : (
          <ul className="list-disc pl-6">
            {{filterItems(currentNode).map((item, index) => (
              <li key={{index}}>{{item}}</li>
            ))}}
          </ul>
        )}}
      </div>

      {{path.length > 0 && (
        <Button variant="outline" onClick={{() => setPath(path.slice(0, -1))}}>
          Back
        </Button>
      )}}
    </div>
  );
}}
