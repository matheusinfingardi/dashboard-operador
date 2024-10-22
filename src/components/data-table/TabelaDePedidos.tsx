"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Pedido = {
  id: string;
  numeroPedido: string;
  nomeCliente: string;
  status: "Pendente" | "Em progresso" | "Concluído"; // Letra maiúscula
  dataPedido: string;
  localInicio: string;
  localEntrega: string;
};

const data: Pedido[] = [
  {
    id: "p1",
    numeroPedido: "001",
    nomeCliente: "Alice Silva",
    status: "Concluído", // Letra maiúscula
    dataPedido: "2024-10-01",
    localInicio: "Rua A, 123",
    localEntrega: "Rua B, 456",
  },
  {
    id: "p2",
    numeroPedido: "002",
    nomeCliente: "João Pereira",
    status: "Em progresso", // Letra maiúscula
    dataPedido: "2024-10-05",
    localInicio: "Rua C, 789",
    localEntrega: "Rua D, 101",
  },
  {
    id: "p3",
    numeroPedido: "003",
    nomeCliente: "Inês Santos",
    status: "Pendente", // Letra maiúscula
    dataPedido: "2024-10-10",
    localInicio: "Rua E, 112",
    localEntrega: "Rua F, 131",
  },
  {
    id: "p4",
    numeroPedido: "004",
    nomeCliente: "Ricardo Carvalho",
    status: "Concluído", // Letra maiúscula
    dataPedido: "2024-10-12",
    localInicio: "Rua G, 415",
    localEntrega: "Rua H, 161",
  },
];

export const columns: ColumnDef<Pedido>[] = [
  {
    accessorKey: "numeroPedido",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Número do Pedido <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("numeroPedido")}</div>,
  },
  {
    accessorKey: "nomeCliente",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nome do Cliente <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("nomeCliente")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Status <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "dataPedido",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Data do Pedido <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("dataPedido")}</div>,
  },
  {
    accessorKey: "localInicio",
    header: "Local de Início",
    cell: ({ row }) => <div className="text-center">{row.getValue("localInicio")}</div>,
  },
  {
    accessorKey: "localEntrega",
    header: "Local de Entrega",
    cell: ({ row }) => <div className="text-center">{row.getValue("localEntrega")}</div>,
  },
  {
    id: "acoes",
    header: "Gerenciar",
    cell: ({ row }) => {
      const pedido = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert(`Ver detalhes do pedido ${pedido.numeroPedido}`)}>Ver Detalhes</DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Ver missão do pedido ${pedido.numeroPedido}`)}>Ver Missão</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TabelaDePedidos() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [filterValue, setFilterValue] = React.useState("");

  const filteredData = React.useMemo(() => {
    return data.filter(pedido =>
      pedido.nomeCliente.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome do cliente..."
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
