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

export type Infraestrutura = {
  id: string;
  nome: string;
  modelo: "Droneporto" | "Estacao Rooftop" | "Mailbox" | "QRcode"; // Modelos atualizados
  local: string;
  capacidade: number;
  emUso: number; // Agora em porcentagem
};

const data: Infraestrutura[] = [
  {
    id: "i1",
    nome: "Infraestrutura A",
    modelo: "Droneporto",
    local: "Local A",
    capacidade: 100,
    emUso: 75, // Exemplo em porcentagem
  },
  {
    id: "i2",
    nome: "Infraestrutura B",
    modelo: "Estacao Rooftop",
    local: "Local B",
    capacidade: 200,
    emUso: 50,
  },
  {
    id: "i3",
    nome: "Infraestrutura C",
    modelo: "Mailbox",
    local: "Local C",
    capacidade: 150,
    emUso: 90,
  },
  {
    id: "i4",
    nome: "Infraestrutura D",
    modelo: "QRcode",
    local: "Local D",
    capacidade: 250,
    emUso: 30,
  },
];

export const columns: ColumnDef<Infraestrutura>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Nome <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "modelo",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Modelo <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("modelo")}</div>,
  },
  {
    accessorKey: "local",
    header: "Local",
    cell: ({ row }) => <div className="text-center">{row.getValue("local")}</div>,
  },
  {
    accessorKey: "capacidade",
    header: "Capacidade",
    cell: ({ row }) => <div className="text-center">{row.getValue("capacidade")}</div>,
  },
  {
    accessorKey: "emUso",
    header: "Em Uso (%)",
    cell: ({ row }) => <div className="text-center">{row.getValue("emUso")}%</div>, // Exibir porcentagem
  },
  {
    id: "gerenciar",
    header: "Gerenciar",
    cell: ({ row }) => {
      const infraestrutura = row.original;

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
            <DropdownMenuCheckboxItem onClick={() => alert(`Ver detalhes da infraestrutura ${infraestrutura.nome}`)}>Ver Detalhes</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TabelaInfraestrutura() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [filterValue, setFilterValue] = React.useState("");

  const filteredData = React.useMemo(() => {
    return data.filter(infra =>
      infra.nome.toLowerCase().includes(filterValue.toLowerCase())
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
          placeholder="Filtrar por nome..."
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
