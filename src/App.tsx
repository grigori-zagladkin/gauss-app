import { ChangeEvent, FC, useCallback, useState } from "react";
import {
    Stack,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Button,
    Grid,
    GridItem,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Td,
    Th,
    Tbody,
} from "@chakra-ui/react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { getGaussDistribution } from "./utils/Gauss";

const App: FC = () => {
    const [length, setLength] = useState<number>(1);
    const handleChangeLength = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLength(+e.target.value);
    }, []);
    const [minValue, setMinValue] = useState<number>(1);
    const handleChangeMinValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMinValue(+e.target.value);
    }, []);
    const [maxValue, setMaxValue] = useState<number>(1);
    const handleChangeMaxValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMaxValue(+e.target.value);
    }, []);
    let gauss = getGaussDistribution(length, minValue, maxValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="max-w-full w-full mx-auto p-5 ">
            <Stack gap={5}>
                <Heading as="h1">Построение распределения Гаусса</Heading>
                <main className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
                    <GridItem>
                        <Stack gap={2} fontSize="2xl">
                            <FormControl isRequired>
                                <FormLabel>Количество точек</FormLabel>
                                <Input
                                    type={"number"}
                                    value={length}
                                    onChange={handleChangeLength}
                                    placeholder="Количество точек"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Минимальная величина</FormLabel>
                                <Input
                                    value={minValue}
                                    onChange={handleChangeMinValue}
                                    placeholder="Минимальная величина"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Максимальная величина</FormLabel>
                                <Input
                                    value={maxValue}
                                    onChange={handleChangeMaxValue}
                                    placeholder="Максимальная величина"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <Button onClick={() => setIsOpen(true)}>Построить график и расчитать значения</Button>
                            </FormControl>
                        </Stack>
                    </GridItem>
                    {isOpen && (
                        <GridItem>
                            <TableContainer className="border rounded-lg p-2 max-w-full">
                                <Table variant={"striped"} colorScheme="teal">
                                    <TableCaption>Расчёт значений</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>Величина</Th>
                                            <Th isNumeric>Значение</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Количество точек</Td>
                                            <Td isNumeric>{gauss.length}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Математическое ожидание μ</Td>
                                            <Td isNumeric>{gauss.mathExpectation}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Среднеквадратинчое отклонение σ </Td>
                                            <Td isNumeric>{gauss.standardDeviation}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>
                                                Дисперсия σ<sup>2</sup>
                                            </Td>
                                            <Td isNumeric>{gauss.dispersion}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </GridItem>
                    )}
                </main>
                {isOpen && (
                    <Stack gap={3} className="max-w-full flex flex-col items-center pb-10">
                        <Heading as={"h2"}>Графическое распределение</Heading>
                        <LineChart width={400} height={400} data={gauss.gaussArray} className="max-w-full">
                            <Line type={"monotone"} stroke="#8884d8" dataKey={"y"} />
                            <CartesianGrid stroke="#ccc" strokeDasharray={"5 5"} />
                            <XAxis dataKey={"x"} />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </Stack>
                )}
            </Stack>
        </div>
    );
};

export default App;
