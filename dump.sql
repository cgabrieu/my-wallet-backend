--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: gabriel
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text
);


ALTER TABLE public.sessions OWNER TO gabriel;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: gabriel
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO gabriel;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gabriel
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: gabriel
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    description text NOT NULL,
    value integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.transactions OWNER TO gabriel;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: gabriel
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_id_seq OWNER TO gabriel;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gabriel
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: gabriel
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text
);


ALTER TABLE public.users OWNER TO gabriel;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: gabriel
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO gabriel;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gabriel
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: gabriel
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: gabriel
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: gabriel
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: gabriel
--

COPY public.sessions (id, "userId", token) FROM stdin;
270	141	5333d322-d2fd-400e-bf73-f8783ba84a7f
271	142	49e5c465-d9c5-4ac2-af79-dfb8b755d161
272	142	0a473b20-f339-409f-9b1b-cc2d87925f47
273	143	227ed2b7-dc93-417a-9329-a35540702bc3
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: gabriel
--

COPY public.transactions (id, "userId", description, value, "createdAt") FROM stdin;
14	7	Bola de Futebolaaaaaa	2000	2021-10-24 00:18:45.03654-03
15	7	Compra Bola de Futebol	-2000	2021-10-24 00:18:53.921771-03
16	6	Compra Bola de Futebol	-2000	2021-10-24 00:20:59.736025-03
17	6	Compra Bola de Futebol	-2000	2021-10-24 00:24:41.572113-03
18	6	Compra Bola de Futebol	-2000	2021-10-24 00:24:42.649783-03
19	6	Compra Bola de Futebol	-2000	2021-10-24 00:24:43.311223-03
20	6	Compra Bola de Futebol	2000	2021-10-24 00:24:48.509932-03
21	7	dasdsd	654	2021-10-24 23:34:08.350993-03
22	7	dasdsd	654	2021-10-24 23:34:18.142342-03
23	7	Muito dinheiro	655623	2021-10-24 23:34:33.772422-03
24	7	Centavos	45	2021-10-24 23:35:58.686932-03
25	7	Meu deus cara	125000	2021-10-24 23:36:22.680137-03
26	7	HAHHAHAHA	4999	2021-10-24 23:37:04.729197-03
27	7	Almoço	2365	2021-10-24 23:39:52.000964-03
28	7	Comprei uma carne	-5033	2021-10-24 23:47:04.36576-03
29	7	Um carrão	9865314	2021-10-24 23:48:33.847431-03
30	7	Um carro	6549856	2021-10-24 23:48:49.440968-03
31	7	Cara	-456	2021-10-24 23:48:58.774687-03
32	7	KKKKKKKKKKK	-500	2021-10-24 23:51:19.117436-03
33	7	KKK	-99999999	2021-10-24 23:53:16.734932-03
34	7	MANO	99999999	2021-10-24 23:53:29.917204-03
35	7	aaa	5	2021-10-25 00:00:36.113474-03
36	8	Jogo do Bicho	5000	2021-10-25 00:29:14.230236-03
37	8	Perdi no Jogo do Bic	-4500	2021-10-25 00:29:35.515215-03
38	9	MiBand	5600	2021-10-25 09:21:43.732067-03
39	9	Fone de ouvido	-6000	2021-10-25 09:22:03.478619-03
40	7	Dinheiro Saindo Poxa	-500	2021-10-25 10:06:19.287274-03
41	9	bala	5	2021-10-25 11:38:25.368685-03
42	142	Vendi um cubo	5000	2021-10-25 16:27:42.127627-03
43	142	Comprei um cubo	8000	2021-10-25 16:27:50.359942-03
44	142	Ganhei da namorada	6999	2021-10-25 16:28:03.398036-03
45	142	Agora sim comprei	-16000	2021-10-25 16:28:20.512777-03
46	142	Coxinha de capivara	-600	2021-10-25 16:29:07.767836-03
47	142	Presente mãe linda	14000	2021-10-25 16:29:22.500836-03
48	142	Pizza fim de semana	4999	2021-10-25 16:29:46.395971-03
49	142	Balinha	-50	2021-10-25 16:30:03.609889-03
50	142	Balinha menor ainda	-5	2021-10-25 16:30:09.765183-03
51	142	Churraaaaaaaaaaasco	-4000	2021-10-25 16:30:33.445297-03
52	142	Impostos <3	16525	2021-10-25 16:31:11.127556-03
53	142	Jaca	1300	2021-10-25 16:31:22.72985-03
54	142	Devolvendo impostos	-32641	2021-10-25 16:31:53.024524-03
55	142	Eu sou muito tonto<>	-80000	2021-10-25 16:32:09.969603-03
56	142	Isso acima não é bug	666	2021-10-25 16:32:31.780166-03
57	143	BRABA	4590	2021-10-25 16:33:53.08202-03
58	143	BARBA	0	2021-10-25 16:34:02.563375-03
59	143	TESTE COM ZERO	0	2021-10-25 16:36:16.259598-03
60	143	dasd	0	2021-10-25 16:37:35.891703-03
61	143	VAI FUNFA?	0	2021-10-25 16:38:43.524207-03
62	143	bota	1	2021-10-25 16:38:52.749885-03
63	143	e agr?	5	2021-10-25 16:40:07.385992-03
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: gabriel
--

COPY public.users (id, name, email, password) FROM stdin;
141	Ricardo Carvalho	Yango14@bol.com.br	$2b$10$28lCPkPbC9zcPyDC.I8poOzpCz6It4hDDMFVVnBctEcso9LRw4aY.
142	Gabriel	carlosgabrielpc@live.com	$2b$10$59N8LctDZTGzTU.yEMEAAO5dXfwADkhfbN4JdTi7CCv.BwqqeBbt6
143	Pai do teste, mãe	teste@pai.com	$2b$10$JmX3eTvl6LJkHhwfaKNCR.DKSK9PYMUF/a.G7yjmo00HGuzTOjuuS
\.


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gabriel
--

SELECT pg_catalog.setval('public.sessions_id_seq', 273, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gabriel
--

SELECT pg_catalog.setval('public.transactions_id_seq', 63, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gabriel
--

SELECT pg_catalog.setval('public.users_id_seq', 143, true);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: gabriel
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

