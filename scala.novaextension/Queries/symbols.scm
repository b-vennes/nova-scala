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
	(var_definition
		pattern: (identifier)	@name
	) @subtree
	(#set! role variable)	
)

(
	(class_definition
		name: (identifier) @name
	) @subtree
	(#set! role class)
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

(
	(simple_enum_case
		name: (identifier) @name
	) @subtree
	(#set! role constant)
)

(
	(trait_definition
		name: (identifier) @name
	) @subtree
	(#set! role interface)
)

(
	(trait_definition
		body: (template_body
			(function_declaration
				name: (identifier) @name
			) @subtree
		)
	)
	(#set! role method)
)

(
	(class_definition
		body: (template_body
			(function_definition
				name: (identifier) @name
			) @subtree
		)
	)
	(#set! role method)
)

(
	(object_definition
		body: (template_body
			(function_definition
				name: (identifier) @name
			) @subtree
		)
	)
	(#set! role function)
)

(
	(function_definition
		body: (block
			(function_definition
				name: (identifier) @name
			) @subtree
		)
	)
	(#set! role function)
)
