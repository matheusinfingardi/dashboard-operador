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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Play } from "lucide-react";
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

export type Missao = {
  id: string;
  numeroPedido: string;
  nomeCliente: string;
  status: "pendente" | "em progresso" | "concluído";
  dataPedido: string;
  localInicio: string;
  localEntrega: string;
};

const data: Missao[] = [
  {
    id: "m1",
    numeroPedido: "001",
    nomeCliente: "Alice Silva",
    status: "concluído",
    dataPedido: "2024-10-01",
    localInicio: "Rua A, 123",
    localEntrega: "Rua B, 456",
  },
  {
    id: "m2",
    numeroPedido: "002",
    nomeCliente: "João Pereira",
    status: "em progresso",
    dataPedido: "2024-10-05",
    localInicio: "Rua C, 789",
    localEntrega: "Rua D, 101",
  },
  {
    id: "m3",
    numeroPedido: "003",
    nomeCliente: "Inês Santos",
    status: "pendente",
    dataPedido: "2024-10-10",
    localInicio: "Rua E, 112",
    localEntrega: "Rua F, 131",
  },
  {
    id: "m4",
    numeroPedido: "004",
    nomeCliente: "Ricardo Carvalho",
    status: "concluído",
    dataPedido: "2024-10-12",
    localInicio: "Rua G, 415",
    localEntrega: "Rua H, 161",
  },
];

export const columns: ColumnDef<Missao>[] = [
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
    accessorKey: "dataPedido",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Data do Pedido <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("dataPedido")}</div>,
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
    id: "gerenciar",
    header: "Gerenciar",
    cell: ({ row }) => {
      const missao = row.original;

      return (
        <div className="flex justify-center space-x-2">
          <Button 
            variant="default" 
            className="bg-black text-white" // Botão com fundo preto
            onClick={() => alert(`Iniciar missão ${missao.numeroPedido}`)}
          >
            <Play className="h-4 w-4 mr-1" />
            Iniciar Missão
          </Button>
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
              <DropdownMenuItem onClick={() => alert(`Ver detalhes da missão ${missao.numeroPedido}`)}>
                Ver Detalhes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function TabelaDeMissoes() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [filterValue, setFilterValue] = React.useState("");

  const filteredData = React.useMemo(() => {
    return data.filter(missao =>
      missao.numeroPedido.toLowerCase().includes(filterValue.toLowerCase())
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
          placeholder="Filtrar por número do pedido..."
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
