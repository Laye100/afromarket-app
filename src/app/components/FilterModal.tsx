import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  selectedCategory?: string;
}

export function FilterModal({ isOpen, onClose, resultCount, selectedCategory }: FilterModalProps) {
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [vendorFilter, setVendorFilter] = useState('all');
  const [hideOutOfStock, setHideOutOfStock] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const activeFiltersCount = selectedCategories.length + (vendorFilter !== 'all' ? 1 : 0) + (hideOutOfStock ? 1 : 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[90vh] rounded-t-3xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">Filtres</h2>
          <div className="flex items-center gap-3">
            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setVendorFilter('all');
                  setHideOutOfStock(false);
                  setPriceRange([0, 500000]);
                }}
                className="text-sm text-[#0F7B6C] font-medium"
              >
                Réinitialiser
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Filters Chips */}
        {activeFiltersCount > 0 && (
          <div className="p-4 border-b flex flex-wrap gap-2">
            {selectedCategories.map(cat => (
              <span key={cat} className="inline-flex items-center gap-1 bg-[#0F7B6C] text-white text-xs px-3 py-1 rounded-full">
                {cat}
                <button onClick={() => handleCategoryChange(cat)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)] pb-24">
          <Accordion type="multiple" className="w-full">
            {/* Catégorie */}
            <AccordionItem value="category">
              <AccordionTrigger className="px-4 py-3 text-base font-semibold">
                📦 CATÉGORIE
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3">
                  {['Tissus Africains', 'Vêtements', 'Chaussures', 'Électronique', 'Accessoires', 'Beauté'].map(cat => (
                    <div key={cat} className="flex items-center gap-2">
                      <Checkbox
                        id={cat}
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() => handleCategoryChange(cat)}
                      />
                      <Label htmlFor={cat} className="text-sm cursor-pointer">
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Prix */}
            <AccordionItem value="price">
              <AccordionTrigger className="px-4 py-3 text-base font-semibold">
                💰 PRIX
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500000}
                    step={1000}
                    className="my-6"
                  />
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label className="text-xs text-gray-600">Min (CFA)</Label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                        className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs text-gray-600">Max (CFA)</Label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                        className="w-full px-3 py-2 border rounded-lg text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Vendeur */}
            <AccordionItem value="vendor">
              <AccordionTrigger className="px-4 py-3 text-base font-semibold">
                🏪 VENDEUR
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <RadioGroup value={vendorFilter} onValueChange={setVendorFilter}>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="all" id="vendor-all" />
                    <Label htmlFor="vendor-all" className="text-sm cursor-pointer">Tous</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="tissenza" id="vendor-tissenza" />
                    <Label htmlFor="vendor-tissenza" className="text-sm cursor-pointer">Stock Tissenza</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partners" id="vendor-partners" />
                    <Label htmlFor="vendor-partners" className="text-sm cursor-pointer">Vendeurs partenaires</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            {/* Disponibilité */}
            <AccordionItem value="availability">
              <AccordionTrigger className="px-4 py-3 text-base font-semibold">
                ✅ DISPONIBILITÉ
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hide-out-of-stock" className="text-sm">
                    Masquer ruptures de stock
                  </Label>
                  <Switch
                    id="hide-out-of-stock"
                    checked={hideOutOfStock}
                    onCheckedChange={setHideOutOfStock}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Category-specific filters */}
            {selectedCategory === 'Tissus Africains' && (
              <>
                <AccordionItem value="fabric-type">
                  <AccordionTrigger className="px-4 py-3 text-base font-semibold">
                    🧵 TYPE DE TISSU
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {['Wax', 'Bazin', 'Pagne', 'Dentelle'].map(type => (
                        <button
                          key={type}
                          className="px-4 py-2 rounded-full bg-gray-100 text-sm hover:bg-[#0F7B6C] hover:text-white transition-colors"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </>
            )}
          </Accordion>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategories([]);
              setVendorFilter('all');
              setHideOutOfStock(false);
              setPriceRange([0, 500000]);
            }}
            className="flex-1"
          >
            Effacer tout
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-[#FFC300] hover:bg-[#FFC300]/90 text-gray-900 font-semibold"
          >
            Voir {resultCount} résultats
          </Button>
        </div>
      </div>
    </div>
  );
}
