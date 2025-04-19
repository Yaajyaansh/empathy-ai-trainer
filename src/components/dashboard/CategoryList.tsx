
import { ScenarioCategory } from "@/types";
import { Headset, Tag, Shield, Package, BadgePercent, BookOpen } from "lucide-react";

interface CategoryListProps {
  categories: ScenarioCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryList({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryListProps) {
  // Map category icons to Lucide components
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'headset':
        return <Headset className="w-5 h-5" />;
      case 'tag':
        return <Tag className="w-5 h-5" />;
      case 'shield':
        return <Shield className="w-5 h-5" />;
      case 'package':
        return <Package className="w-5 h-5" />;
      case 'badge-percent':
        return <BadgePercent className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-1 mb-6">
      <h3 className="font-medium text-sm text-muted-foreground mb-3">CATEGORIES</h3>
      
      <button
        onClick={() => onSelectCategory(null)}
        className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 ${
          selectedCategory === null 
            ? 'bg-primary/10 text-primary font-medium' 
            : 'hover:bg-muted/50'
        }`}
      >
        <BookOpen className="w-5 h-5" />
        <span>All Modules</span>
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 ${
            selectedCategory === category.id 
              ? 'bg-primary/10 text-primary font-medium' 
              : 'hover:bg-muted/50'
          }`}
        >
          {getCategoryIcon(category.icon)}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
