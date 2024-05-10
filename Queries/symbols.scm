(
	(object_definition
		name: (identifier) @name
	) @subtree
	(#set! role type)
)

(
	(val_definition
		pattern: (identifier) @name
	) @subtree
	(#set! role constant)
)

(
	(class_definition
		name: (identifier) @name
	) @subtree
	(#set! role class)
)

(
	(function_definition
		name: (identifier) @name
	) @subtree
	(#set! role function)
)

(
	(enum_definition
		name: (identifier) @name
	) @subtree
	(#set! role union)
)

(
	(full_enum_case
		name: (identifier) @name
	) @subtree
	(#set! role class)
)