import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
import { Search, Package, XIcon, CheckCircle2, CreditCard, Banknote, Trash2, Minus, Plus, ShoppingCart, UserIcon, Clock, History, LogOut, ArrowLeft, Calendar } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
const SAMPLE_PRODUCTS = [
  { id: "1", name: "Espresso", price: 3.5, category: "Beverages", image: "☕" },
  { id: "2", name: "Cappuccino", price: 4.5, category: "Beverages", image: "☕" },
  { id: "3", name: "Latte", price: 4.75, category: "Beverages", image: "☕" },
  { id: "4", name: "Croissant", price: 3.25, category: "Bakery", image: "🥐" },
  { id: "5", name: "Blueberry Muffin", price: 3.75, category: "Bakery", image: "🧁" },
  { id: "6", name: "Chocolate Cookie", price: 2.5, category: "Bakery", image: "🍪" },
  { id: "7", name: "Caesar Salad", price: 8.95, category: "Food", image: "🥗" },
  { id: "8", name: "Turkey Sandwich", price: 9.5, category: "Food", image: "🥪" },
  { id: "9", name: "Fruit Bowl", price: 6.75, category: "Food", image: "🍇" },
  { id: "10", name: "Orange Juice", price: 4.25, category: "Beverages", image: "🧃" },
  { id: "11", name: "Iced Tea", price: 3.75, category: "Beverages", image: "🍹" },
  { id: "12", name: "Bagel", price: 2.95, category: "Bakery", image: "🥯" }
];
const CATEGORIES = ["All", "Beverages", "Bakery", "Food"];
function ProductGrid({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts = SAMPLE_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col overflow-hidden p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Search products...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-10"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: CATEGORIES.map((category) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: selectedCategory === category ? "default" : "outline",
          size: "sm",
          onClick: () => setSelectedCategory(category),
          children: category
        },
        category
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 pb-4 md:grid-cols-3 lg:grid-cols-4", children: filteredProducts.map((product) => /* @__PURE__ */ jsx(
        Card,
        {
          className: "group cursor-pointer overflow-hidden transition-all hover:shadow-lg active:scale-95",
          onClick: () => onAddToCart(product),
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-3 flex h-24 items-center justify-center rounded-lg bg-secondary text-5xl", children: product.image }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "mb-2 w-fit text-xs", children: product.category }),
            /* @__PURE__ */ jsx("h3", { className: "mb-1 font-medium text-card-foreground", children: product.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-lg font-semibold text-primary", children: [
              "$",
              product.price.toFixed(2)
            ] })
          ] })
        },
        product.id
      )) }),
      filteredProducts.length === 0 && /* @__PURE__ */ jsxs("div", { className: "flex h-64 flex-col items-center justify-center text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Package, { className: "mb-3 h-12 w-12" }),
        /* @__PURE__ */ jsx("p", { children: "No products found" })
      ] })
    ] })
  ] });
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function CheckoutDialog({ open, onClose, onComplete, total, items, onAddTransaction }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cashReceived, setCashReceived] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const change = paymentMethod === "cash" ? Math.max(0, Number.parseFloat(cashReceived || "0") - total) : 0;
  const handleComplete = async () => {
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onAddTransaction({
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total,
      paymentMethod,
      change: paymentMethod === "cash" ? change : 0
    });
    setSuccess(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(false);
      setCashReceived("");
      onComplete();
    }, 2e3);
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Complete Payment" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Select payment method and complete the transaction" })
    ] }),
    success ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-8 w-8 text-accent-foreground" }) }),
      /* @__PURE__ */ jsx("h3", { className: "mb-2 text-xl font-semibold", children: "Payment Successful!" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Transaction completed" })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { className: "mb-3 block text-sm font-medium", children: "Payment Method" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: paymentMethod === "card" ? "default" : "outline",
              className: "h-20 flex-col gap-2",
              onClick: () => setPaymentMethod("card"),
              children: [
                /* @__PURE__ */ jsx(CreditCard, { className: "h-6 w-6" }),
                /* @__PURE__ */ jsx("span", { children: "Card" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: paymentMethod === "cash" ? "default" : "outline",
              className: "h-20 flex-col gap-2",
              onClick: () => setPaymentMethod("cash"),
              children: [
                /* @__PURE__ */ jsx(Banknote, { className: "h-6 w-6" }),
                /* @__PURE__ */ jsx("span", { children: "Cash" })
              ]
            }
          )
        ] })
      ] }),
      paymentMethod === "cash" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "cash-received", children: "Cash Received" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "cash-received",
              type: "number",
              step: "0.01",
              placeholder: "0.00",
              value: cashReceived,
              onChange: (e) => setCashReceived(e.target.value),
              className: "mt-1.5"
            }
          )
        ] }),
        cashReceived && Number.parseFloat(cashReceived) >= total && /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-secondary p-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Change Due" }),
          /* @__PURE__ */ jsxs("span", { className: "text-lg font-semibold text-accent", children: [
            "$",
            change.toFixed(2)
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-lg border bg-muted/30 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-lg font-medium", children: "Total Amount" }),
        /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-primary", children: [
          "$",
          total.toFixed(2)
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "w-full",
          size: "lg",
          onClick: handleComplete,
          disabled: processing || paymentMethod === "cash" && Number.parseFloat(cashReceived || "0") < total,
          children: processing ? "Processing..." : "Complete Payment"
        }
      )
    ] })
  ] }) });
}
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx(ScrollBar, {}),
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function Cart({ items, onRemoveItem, onUpdateQuantity, onClearCart, onAddTransaction }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const subtotal = items.reduce((total2, item) => total2 + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const handleCheckout = () => {
    setShowCheckout(true);
  };
  const handleCheckoutComplete = () => {
    onClearCart();
    setShowCheckout(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col border-l bg-card md:w-96", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b p-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Current Order" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          items.length,
          " items"
        ] })
      ] }),
      /* @__PURE__ */ jsx(ScrollArea, { className: "flex-1 p-4", children: items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex h-64 flex-col items-center justify-center text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsx(CreditCard, { className: "mb-3 h-12 w-12" }),
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "No items in cart" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Add products to start an order" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: items.map((item) => /* @__PURE__ */ jsxs(Card, { className: "p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-2xl", children: item.image }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-medium text-card-foreground", children: item.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-semibold text-primary", children: [
              "$",
              item.price.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", onClick: () => onRemoveItem(item.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "h-8 w-8 bg-transparent",
                onClick: () => onUpdateQuantity(item.id, item.quantity - 1),
                children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" })
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "w-8 text-center font-medium", children: item.quantity }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "h-8 w-8 bg-transparent",
                onClick: () => onUpdateQuantity(item.id, item.quantity + 1),
                children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "font-semibold", children: [
            "$",
            (item.price * item.quantity).toFixed(2)
          ] })
        ] })
      ] }, item.id)) }) }),
      /* @__PURE__ */ jsxs("div", { className: "border-t p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              "$",
              subtotal.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Tax (8%)" }),
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              "$",
              tax.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Total" }),
            /* @__PURE__ */ jsxs("span", { className: "font-bold text-primary", children: [
              "$",
              total.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2", children: [
          /* @__PURE__ */ jsxs(Button, { className: "w-full", size: "lg", disabled: items.length === 0, onClick: handleCheckout, children: [
            /* @__PURE__ */ jsx(CreditCard, { className: "mr-2 h-5 w-5" }),
            "Checkout"
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              className: "w-full bg-transparent",
              disabled: items.length === 0,
              onClick: onClearCart,
              children: "Clear Cart"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      CheckoutDialog,
      {
        open: showCheckout,
        onClose: () => setShowCheckout(false),
        onComplete: handleCheckoutComplete,
        total,
        items,
        onAddTransaction
      }
    )
  ] });
}
function Header({ user, onLogout, onShowHistory }) {
  const currentTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between border-b bg-card px-6 py-4 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsx(ShoppingCart, { className: "h-5 w-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-foreground", children: "Point of Sale" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Retail System" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      user && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm", children: [
        /* @__PURE__ */ jsx(UserIcon, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: user.username }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground capitalize", children: [
          "(",
          user.role,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "font-mono", children: currentTime })
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: onShowHistory, children: [
        /* @__PURE__ */ jsx(History, { className: "mr-2 h-4 w-4" }),
        "History"
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: onLogout, children: [
        /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
        "Logout"
      ] })
    ] })
  ] });
}
function TransactionHistory({ transactions, onClose }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b bg-card p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: onClose, children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Transaction History" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          transactions.length,
          " total transactions"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(ScrollArea, { className: "flex-1 p-6", children: transactions.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex h-96 flex-col items-center justify-center text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Calendar, { className: "mb-3 h-12 w-12" }),
      /* @__PURE__ */ jsx("p", { className: "font-medium", children: "No transactions yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Completed orders will appear here" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl space-y-4", children: transactions.map((transaction) => /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: new Date(transaction.timestamp).toLocaleString() }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-2xl font-bold text-primary", children: [
            "$",
            transaction.total.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "gap-1.5", children: [
          transaction.paymentMethod === "card" ? /* @__PURE__ */ jsx(CreditCard, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(Banknote, { className: "h-3 w-3" }),
          transaction.paymentMethod === "card" ? "Card" : "Cash"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2 border-t pt-4", children: transaction.items.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
          item.quantity,
          "x ",
          item.name
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
          "$",
          (item.price * item.quantity).toFixed(2)
        ] })
      ] }, index)) }),
      transaction.change > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex justify-between border-t pt-4 text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Change Given" }),
        /* @__PURE__ */ jsxs("span", { className: "font-medium text-accent", children: [
          "$",
          transaction.change.toFixed(2)
        ] })
      ] })
    ] }, transaction.id)) }) })
  ] });
}
const LoginForm = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState("parent");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("");
  const DEFAULT_ADMIN = { username: "admin", password: "Admin123" };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEmailInput("");
    setPasswordInput("");
    setError("");
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!emailInput.trim() || !passwordInput) {
      setError("Please enter both username/email and password.");
      return;
    }
    if (activeTab === "admin") {
      if (emailInput === DEFAULT_ADMIN.username && passwordInput === DEFAULT_ADMIN.password) {
        onLogin(emailInput);
      } else {
        setError('Invalid admin credentials. Default admin: username "admin" password "Admin123"');
      }
    } else {
      onLogin(emailInput);
    }
  };
  const handleForgotPassword = () => {
    if (!forgotEmail.trim()) {
      setResetMessage("Please enter your email address.");
      return;
    }
    setResetMessage("If this email is registered, password reset instructions have been sent.");
  };
  const openForgotModal = (e) => {
    e.preventDefault();
    setShowForgotModal(true);
    setForgotEmail("");
    setResetMessage("");
  };
  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotEmail("");
    setResetMessage("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 flex items-start justify-center px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-[-36px] z-10 relative pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "w-22 h-22 p-4 rounded-full bg-white shadow-lg pointer-events-auto animate-bounce", children: /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-gray-900 rounded-lg flex items-center justify-center text-2xl text-white", children: "💳" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 pt-12 shadow-xl", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-center mb-2 text-gray-900", children: "Welcome to EduTap" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-5", role: "tablist", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleTabChange("parent"),
              role: "tab",
              "aria-selected": activeTab === "parent",
              className: `flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${activeTab === "parent" ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
              children: "👥 Parent/Guardian"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleTabChange("admin"),
              role: "tab",
              "aria-selected": activeTab === "admin",
              className: `flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${activeTab === "admin" ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`,
              children: "🏫 Adviser/Admin"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleLoginSubmit, noValidate: true, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "emailInput", className: "block font-semibold mb-2 text-sm text-gray-900", children: activeTab === "parent" ? "Email Address" : "Admin Username" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "emailInput",
                type: activeTab === "parent" ? "email" : "text",
                value: emailInput,
                onChange: (e) => setEmailInput(e.target.value),
                placeholder: activeTab === "parent" ? "Enter your email" : "Enter your username",
                autoComplete: "username",
                className: "w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "passwordInput", className: "block font-semibold mb-2 text-sm text-gray-900", children: activeTab === "parent" ? "Password" : "Admin Password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "passwordInput",
                type: "password",
                value: passwordInput,
                onChange: (e) => setPasswordInput(e.target.value),
                placeholder: "Enter your password",
                autoComplete: "current-password",
                className: "w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-sm flex items-center gap-2 text-gray-700", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: rememberMe,
                  onChange: (e) => setRememberMe(e.target.checked),
                  className: "rounded"
                }
              ),
              "Remember me"
            ] }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "#",
                onClick: openForgotModal,
                className: "text-sm font-semibold text-blue-600 hover:text-blue-700",
                children: "Forgot Password?"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600 mb-3", children: [
            /* @__PURE__ */ jsx("span", { children: "⚠️" }),
            /* @__PURE__ */ jsx("span", { children: error })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "w-full mt-2 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md",
              children: "🔒 Sign In"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center my-5 text-gray-400", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-gray-300" }),
          /* @__PURE__ */ jsx("span", { className: "px-3 text-sm", children: "Need help?" }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-gray-300" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-600 text-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-1", children: "ⓘ Contact Support" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Having trouble logging in? Reach out to your school administrator." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 text-sm mt-5", children: "© 2024 EduTap. All rights reserved." })
    ] }),
    showForgotModal && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4",
        onClick: closeForgotModal,
        "aria-hidden": !showForgotModal,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl",
            role: "dialog",
            "aria-modal": "true",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-2 text-gray-900", children: "Forgot Password" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-4", children: "Enter your email address and we'll send you instructions to reset your password." }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "forgotEmail",
                  type: "email",
                  value: forgotEmail,
                  onChange: (e) => setForgotEmail(e.target.value),
                  placeholder: "Enter your email",
                  className: "w-full px-3 py-2.5 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleForgotPassword,
                    className: "flex-1 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors",
                    children: "Send"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: closeForgotModal,
                    className: "flex-1 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors",
                    children: "Cancel"
                  }
                )
              ] }),
              resetMessage && /* @__PURE__ */ jsx("div", { className: "mt-3 text-sm text-blue-600 text-center", children: resetMessage })
            ]
          }
        )
      }
    )
  ] });
};
const page = withComponentProps(function POSPage() {
  const [showHistory, setShowHistory] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const isAuthenticated = user !== null;
  const handleLogin = (username) => {
    const role = username === "admin" ? "admin" : "staff";
    setUser({
      username,
      role
    });
  };
  const handleLogout = () => {
    setUser(null);
    setShowHistory(false);
  };
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? {
          ...item,
          quantity: item.quantity + 1
        } : item);
      }
      return [...prev, {
        ...product,
        quantity: 1
      }];
    });
  };
  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) => prev.map((item) => item.id === id ? {
      ...item,
      quantity
    } : item));
  };
  const handleClearCart = () => {
    setCartItems([]);
  };
  const handleAddTransaction = (transaction) => {
    setTransactions((prev) => [{
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    }, ...prev]);
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx(LoginForm, {
      onLogin: handleLogin
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "flex h-screen flex-col bg-background",
    children: [/* @__PURE__ */ jsx(Header, {
      user,
      onLogout: handleLogout,
      onShowHistory: () => setShowHistory(!showHistory)
    }), showHistory ? /* @__PURE__ */ jsx(TransactionHistory, {
      transactions,
      onClose: () => setShowHistory(false)
    }) : /* @__PURE__ */ jsxs("div", {
      className: "flex flex-1 overflow-hidden",
      children: [/* @__PURE__ */ jsx(ProductGrid, {
        onAddToCart: handleAddToCart
      }), /* @__PURE__ */ jsx(Cart, {
        items: cartItems,
        onRemoveItem: handleRemoveFromCart,
        onUpdateQuantity: handleUpdateQuantity,
        onClearCart: handleClearCart,
        onAddTransaction: handleAddTransaction
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "React App Template"
  }, {
    name: "description",
    content: "A modern React application template built with React Router, TypeScript, and Tailwind CSS."
  }];
}
const landing = withComponentProps(function LandingPage() {
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col min-h-screen",
    children: /* @__PURE__ */ jsx("main", {
      className: "flex-1",
      children: "asdasd"
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: landing,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-rjBrdWmp.js", "imports": ["/assets/chunk-KNED5TY2-DiC9o4VL.js", "/assets/index-BdtUjonT.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-C_0quR6V.js", "imports": ["/assets/chunk-KNED5TY2-DiC9o4VL.js", "/assets/index-BdtUjonT.js", "/assets/with-props-xH9Ozv4e.js"], "css": ["/assets/root-B2H_Vs6T.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/page": { "id": "routes/page", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/page-Lqqur1bW.js", "imports": ["/assets/with-props-xH9Ozv4e.js", "/assets/chunk-KNED5TY2-DiC9o4VL.js", "/assets/index-BdtUjonT.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/landing": { "id": "routes/landing", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/landing-CjynGG83.js", "imports": ["/assets/with-props-xH9Ozv4e.js", "/assets/chunk-KNED5TY2-DiC9o4VL.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-401740e4.js", "version": "401740e4", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/page": {
    id: "routes/page",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/landing": {
    id: "routes/landing",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
