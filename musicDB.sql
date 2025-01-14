PGDMP                   	    |            dbmusic    16.4    16.4 7                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            !           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            "           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            #           1262    16556    dbmusic    DATABASE        CREATE DATABASE dbmusic WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Vietnamese_Vietnam.utf8';
    DROP DATABASE dbmusic;
                postgres    false                        2615    16633    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            $           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            %           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   pg_database_owner    false    5            �            1259    16634    order_details    TABLE     I  CREATE TABLE public.order_details (
    order_details_id integer NOT NULL,
    order_id integer,
    music_id integer,
    order_details_quantity integer,
    order_details_price double precision,
    total_price double precision GENERATED ALWAYS AS ((order_details_price * (order_details_quantity)::double precision)) STORED
);
 !   DROP TABLE public.order_details;
       public         heap    postgres    false    5            �            1259    16637    ChiTietDonHang_IDChiTietDH_seq    SEQUENCE     �   CREATE SEQUENCE public."ChiTietDonHang_IDChiTietDH_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public."ChiTietDonHang_IDChiTietDH_seq";
       public          postgres    false    215    5            &           0    0    ChiTietDonHang_IDChiTietDH_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."ChiTietDonHang_IDChiTietDH_seq" OWNED BY public.order_details.order_details_id;
          public          postgres    false    216            �            1259    16843    donhang_iddonhang_seq    SEQUENCE     ~   CREATE SEQUENCE public.donhang_iddonhang_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.donhang_iddonhang_seq;
       public          postgres    false    5            �            1259    16638    orders    TABLE     |  CREATE TABLE public.orders (
    order_id integer DEFAULT nextval('public.donhang_iddonhang_seq'::regclass) NOT NULL,
    order_date timestamp without time zone,
    order_status smallint,
    order_total double precision,
    customer_id integer,
    customer_name character varying(255),
    customer_phone character varying(255),
    customer_address character varying(255)
);
    DROP TABLE public.orders;
       public         heap    postgres    false    227    5            �            1259    16641    DonHang_IDDonHang_seq    SEQUENCE     �   CREATE SEQUENCE public."DonHang_IDDonHang_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."DonHang_IDDonHang_seq";
       public          postgres    false    217    5            '           0    0    DonHang_IDDonHang_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."DonHang_IDDonHang_seq" OWNED BY public.orders.order_id;
          public          postgres    false    218            �            1259    16642    customer    TABLE     �   CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    customer_name character varying(255),
    customer_phone character varying(255),
    customer_address character varying(255)
);
    DROP TABLE public.customer;
       public         heap    postgres    false    5            �            1259    16647    KhachHang_IDKhach_seq    SEQUENCE     �   CREATE SEQUENCE public."KhachHang_IDKhach_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."KhachHang_IDKhach_seq";
       public          postgres    false    5    219            (           0    0    KhachHang_IDKhach_seq    SEQUENCE OWNED BY     T   ALTER SEQUENCE public."KhachHang_IDKhach_seq" OWNED BY public.customer.customer_id;
          public          postgres    false    220            �            1259    16654    music    TABLE     �   CREATE TABLE public.music (
    music_id integer NOT NULL,
    music_name character varying(255) NOT NULL,
    music_img character varying(255),
    music_price double precision,
    music_quantity integer,
    music_category_id integer
);
    DROP TABLE public.music;
       public         heap    postgres    false    5            �            1259    16659    NhacCu_IDNhacCu_seq    SEQUENCE     �   CREATE SEQUENCE public."NhacCu_IDNhacCu_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."NhacCu_IDNhacCu_seq";
       public          postgres    false    5    223            )           0    0    NhacCu_IDNhacCu_seq    SEQUENCE OWNED BY     L   ALTER SEQUENCE public."NhacCu_IDNhacCu_seq" OWNED BY public.music.music_id;
          public          postgres    false    224            �            1259    16728    account    TABLE     �   CREATE TABLE public.account (
    account_id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    role character varying(255),
    create_at timestamp without time zone,
    customer_id integer
);
    DROP TABLE public.account;
       public         heap    postgres    false    5            �            1259    16727    account1_account_id_seq    SEQUENCE     �   CREATE SEQUENCE public.account1_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.account1_account_id_seq;
       public          postgres    false    226    5            *           0    0    account1_account_id_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.account1_account_id_seq OWNED BY public.account.account_id;
          public          postgres    false    225            �            1259    16648    category    TABLE     v   CREATE TABLE public.category (
    category_id integer NOT NULL,
    category_name character varying(255) NOT NULL
);
    DROP TABLE public.category;
       public         heap    postgres    false    5            �            1259    16653    category_seq    SEQUENCE     �   CREATE SEQUENCE public.category_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.category_seq;
       public          postgres    false    221    5            +           0    0    category_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.category_seq OWNED BY public.category.category_id;
          public          postgres    false    222            p           2604    16731    account account_id    DEFAULT     y   ALTER TABLE ONLY public.account ALTER COLUMN account_id SET DEFAULT nextval('public.account1_account_id_seq'::regclass);
 A   ALTER TABLE public.account ALTER COLUMN account_id DROP DEFAULT;
       public          postgres    false    226    225    226            n           2604    16712    category category_id    DEFAULT     p   ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_seq'::regclass);
 C   ALTER TABLE public.category ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    222    221            m           2604    16667    customer customer_id    DEFAULT     {   ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public."KhachHang_IDKhach_seq"'::regclass);
 C   ALTER TABLE public.customer ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    220    219            o           2604    16669    music music_id    DEFAULT     s   ALTER TABLE ONLY public.music ALTER COLUMN music_id SET DEFAULT nextval('public."NhacCu_IDNhacCu_seq"'::regclass);
 =   ALTER TABLE public.music ALTER COLUMN music_id DROP DEFAULT;
       public          postgres    false    224    223            j           2604    16665    order_details order_details_id    DEFAULT     �   ALTER TABLE ONLY public.order_details ALTER COLUMN order_details_id SET DEFAULT nextval('public."ChiTietDonHang_IDChiTietDH_seq"'::regclass);
 M   ALTER TABLE public.order_details ALTER COLUMN order_details_id DROP DEFAULT;
       public          postgres    false    216    215                      0    16728    account 
   TABLE DATA           _   COPY public.account (account_id, username, password, role, create_at, customer_id) FROM stdin;
    public          postgres    false    226   R@                 0    16648    category 
   TABLE DATA           >   COPY public.category (category_id, category_name) FROM stdin;
    public          postgres    false    221   �@                 0    16642    customer 
   TABLE DATA           `   COPY public.customer (customer_id, customer_name, customer_phone, customer_address) FROM stdin;
    public          postgres    false    219   0A                 0    16654    music 
   TABLE DATA           p   COPY public.music (music_id, music_name, music_img, music_price, music_quantity, music_category_id) FROM stdin;
    public          postgres    false    223   TB                 0    16634    order_details 
   TABLE DATA           z   COPY public.order_details (order_details_id, order_id, music_id, order_details_quantity, order_details_price) FROM stdin;
    public          postgres    false    215   [C                 0    16638    orders 
   TABLE DATA           �   COPY public.orders (order_id, order_date, order_status, order_total, customer_id, customer_name, customer_phone, customer_address) FROM stdin;
    public          postgres    false    217   �C       ,           0    0    ChiTietDonHang_IDChiTietDH_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."ChiTietDonHang_IDChiTietDH_seq"', 50, true);
          public          postgres    false    216            -           0    0    DonHang_IDDonHang_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."DonHang_IDDonHang_seq"', 13, true);
          public          postgres    false    218            .           0    0    KhachHang_IDKhach_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."KhachHang_IDKhach_seq"', 23, true);
          public          postgres    false    220            /           0    0    NhacCu_IDNhacCu_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."NhacCu_IDNhacCu_seq"', 28, true);
          public          postgres    false    224            0           0    0    account1_account_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.account1_account_id_seq', 8, true);
          public          postgres    false    225            1           0    0    category_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.category_seq', 15, true);
          public          postgres    false    222            2           0    0    donhang_iddonhang_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.donhang_iddonhang_seq', 21, true);
          public          postgres    false    227            r           2606    16671 !   order_details ChiTietDonHang_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "ChiTietDonHang_pkey" PRIMARY KEY (order_details_id);
 M   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "ChiTietDonHang_pkey";
       public            postgres    false    215            t           2606    16673    orders DonHang_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "DonHang_pkey" PRIMARY KEY (order_id);
 ?   ALTER TABLE ONLY public.orders DROP CONSTRAINT "DonHang_pkey";
       public            postgres    false    217            v           2606    16675    customer KhachHang_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT "KhachHang_pkey" PRIMARY KEY (customer_id);
 C   ALTER TABLE ONLY public.customer DROP CONSTRAINT "KhachHang_pkey";
       public            postgres    false    219            x           2606    16677    category LoaiNhacCu_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.category
    ADD CONSTRAINT "LoaiNhacCu_pkey" PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.category DROP CONSTRAINT "LoaiNhacCu_pkey";
       public            postgres    false    221            z           2606    16679    music NhacCu_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.music
    ADD CONSTRAINT "NhacCu_pkey" PRIMARY KEY (music_id);
 =   ALTER TABLE ONLY public.music DROP CONSTRAINT "NhacCu_pkey";
       public            postgres    false    223            |           2606    16735    account account1_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account1_pkey PRIMARY KEY (account_id);
 ?   ALTER TABLE ONLY public.account DROP CONSTRAINT account1_pkey;
       public            postgres    false    226            }           2606    16680 +   order_details ChiTietDonHang_IDDonHang_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "ChiTietDonHang_IDDonHang_fkey" FOREIGN KEY (order_id) REFERENCES public.orders(order_id);
 W   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "ChiTietDonHang_IDDonHang_fkey";
       public          postgres    false    217    4724    215            ~           2606    16685 *   order_details ChiTietDonHang_IDNhacCu_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "ChiTietDonHang_IDNhacCu_fkey" FOREIGN KEY (music_id) REFERENCES public.music(music_id);
 V   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "ChiTietDonHang_IDNhacCu_fkey";
       public          postgres    false    223    215    4730                       2606    16690    orders DonHang_IDKhach_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "DonHang_IDKhach_fkey" FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);
 G   ALTER TABLE ONLY public.orders DROP CONSTRAINT "DonHang_IDKhach_fkey";
       public          postgres    false    219    4726    217            �           2606    16736    account customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.account
    ADD CONSTRAINT customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(customer_id);
 B   ALTER TABLE ONLY public.account DROP CONSTRAINT customer_id_fkey;
       public          postgres    false    219    226    4726            �           2606    16713    music music_categoryid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.music
    ADD CONSTRAINT music_categoryid_fkey FOREIGN KEY (music_category_id) REFERENCES public.category(category_id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.music DROP CONSTRAINT music_categoryid_fkey;
       public          postgres    false    223    4728    221               |   x�]�M
�PF�q��l�%�b߬Zw!�P�t���Px��w�Da�����	��w+qW<
3(Z�gp�����C#�Z��V�`�D�d�1^L�[��D�e5P�+����	^[D\ �.�         B   x�3��L���2�>�0�˂ӿ(=1�ˈ3����y�
\�Ɯa��9�y\����
%�\1z\\\ I           x���=N�@F�S�	�g�_&��JaQ��"�`!(�M$j���Z\��=�&��	P'�j�o߼!Ȋۻ��ڊx)I?�8��YU�����ܔb�qGa�K�i%�.JkЇٲ(n��S�0@��}�&����
^P����~K��s��T���hH3>B39��j�7�I�U\����}�J�U��z���g[��X!E�`�!��Q;Q��e�6H�43�~�ṫ��W����I�i}�ا������y�v����f��?��8C�O�!�L         �   x�MPMJ�0^���Ȑ���٪8AWB	v�:ɐi��y<�71I[0�����Qp�6D��g�a�,����v�>�@���y��C�?P	\�f����R�T���R�5����{�@��m�`R��4&��_���41����|�Qzh��h�K�����
���q���Vr��*c���[�]Ř�%��9��|���Sͣ�^}�j&Q���S��ѷ��P��c�%&wJ��~��
���]Z�ב�!��d�         �   x�]�[� ���b&�c/��:梵����@���c�dʋ�a��`+H��O�Sj�*:�����H��2�O)�#��ء�-V�
���S�`烂'�5��o×t�;F"�H
C$�^�Vc(e��K)�]�5�         �  x���;R�0�k����]�d=:H��T*L�Fa(8 3��h��%L�ᛰJ������c������)
�JC�>#@xX?��ެ���%�D$F��kR�z����bRh">,��XcO\I�H���h ���'&�����.��N�dl�Wj��K��BN�|$b��mP�Y����ޕ�g2^�;��ZRq��B�#0x����~�0l�N�ΰ=A.F,	��3B�0.j��C;��l8!�	>r�����C����4�hi3Z:C��6IM�y�es��1�P��=����yN3������P����8���?�e��e����������3���R����_zWM�f,�_�ʾ�yT�v��DJ�#��     