import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/db/schema";
import { LuShoppingCart } from "react-icons/lu";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <CardTitle className="text-3xl font-semibold">
              {product.name}
            </CardTitle>

            <span className="text-primary text-2xl font-bold">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Categories</span>
          <Badge variant="secondary">{product.category}</Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">
              Stock Available
            </span>
            <Badge variant={product.inStock ? "secondary" : "destructive"}>
              {product.inStock ? `In Stock` : "Out of stock"}
            </Badge>
          </div>

          <Button className="w-full" size="lg" disabled={!product.inStock}>
            <LuShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
